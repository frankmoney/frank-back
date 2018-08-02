import debug from 'debug'
import createPrivateResolver from 'utils/createPrivateResolver'

const log = debug('app:gql:team:team')

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
  async ({ user, prisma: { query } }): Promise<Result> => {
    const prismaTeamAndSelf = (await query.teamMembers(
      {
        where: {
          user: {
            id: user.id,
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
      admin
      canInvite
      accounts {
        id
      }
    }`
    ))[0]

    log('r1:', prismaTeamAndSelf)

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
      admin
      canInvite
      accounts {
        id
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
      admin: prismaTeamAndSelf.admin,
      canInvite: prismaTeamAndSelf.canInvite,
      accountIds: (prismaTeamAndSelf.accounts || []).map(x => x.id),
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
      admin: x.admin,
      canInvite: x.canInvite,
      accountIds: (x.accounts || []).map(y => y.id),
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
