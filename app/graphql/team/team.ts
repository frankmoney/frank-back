import debug from 'debug'
import createPrivateResolver from 'utils/createPrivateResolver'

type Result = {
  team: ResultTeam
  self: ResultProfile
  others: ResultProfile[]
}

type ResultTeam = {
  id: string
  name: string
  accounts: ResultAccount[]
}

type ResultAccount = {
  id: string
  name: string
}

type ResultProfile = {
  id: string
  email: string
  lastName?: string
  firstName?: string
  avatar?: object | null
  admin: boolean
  canInvite: boolean
  accountIds: string[]
  acl: ResultAcl
}

type ResultAcl = {
  remove: boolean
  editRole: boolean
  editAvatar: boolean
  editProfile: boolean
  editPassword: boolean
}

export default createPrivateResolver(
  'team',
  async ({ args, user, prisma: { query } }): Promise<Result> => {
    const prismaTeamAndSelf = (await query.teamMembers(
      {
        where: {
          user: {
            id: (args && args.userId) || user.id,
          },
        },
      },
      `{
      id
      team {
        id
        name
        accounts {
          id
          name
        }
      }
      user {
        email
        lastName
        firstName
      }
      role
      canInvite
      accounts {
        account {
          id
        }
      }
    }`
    ))[0]

    const prismaOthers = await query.teamMembers(
      {
        where: {
          AND: [
            {
              team: {
                id: prismaTeamAndSelf.team.id,
              },
            },
            {
              NOT: {
                id: prismaTeamAndSelf.id,
              },
            },
          ],
        },
      },
      `{
      id
      user {
        email
        lastName
        firstName
      }
      role
      canInvite
      accounts {
        account {
          id
        }
      }
    }`
    )

    const team: ResultTeam = {
      id: prismaTeamAndSelf.team.id,
      name: prismaTeamAndSelf.team.name,
      accounts: prismaTeamAndSelf.team.accounts || [],
    }

    const self: ResultProfile = {
      id: prismaTeamAndSelf.id,
      email: prismaTeamAndSelf.user.email,
      lastName: prismaTeamAndSelf.user.lastName,
      firstName: prismaTeamAndSelf.user.firstName,
      avatar: null,
      admin: prismaTeamAndSelf.role !== 'MEMBER',
      canInvite: prismaTeamAndSelf.canInvite,
      accountIds: (prismaTeamAndSelf.accounts || []).map(x => x.account.id),
      acl: {
        remove: false,
        editRole: true,
        editAvatar: true,
        editProfile: true,
        editPassword: true,
      },
    }

    const others: ResultProfile[] = prismaOthers.map(x => ({
      id: x.id,
      email: x.user.email,
      lastName: x.user.lastName,
      firstName: x.user.firstName,
      avatar: null,
      admin: x.role !== 'MEMBER',
      canInvite: x.canInvite,
      accountIds: (x.accounts || []).map(y => y.account.id),
      acl: {
        remove: self.admin,
        editRole: self.admin,
        editAvatar: false,
        editProfile: self.admin,
        editPassword: false,
      },
    }))

    return {
      team,
      self,
      others,
    }
  }
)
