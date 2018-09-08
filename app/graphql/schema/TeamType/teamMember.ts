import { TeamMember, TeamMemberWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

const teamMembers = createPrivateResolver(
  'Team:member',
  async ({ user, parent, args, prisma: { query } }) => {
    const where: TeamMemberWhereInput = {
      user: {
        OR: [{ id: args.id }, { id: user.id }],
      },
      team: {
        id: parent.id,
      },
    }

    const members = await query.teamMembers<TeamMember[]>(
      { where },
      `{
        role
        canInvite
      
        user {
          id
          email
          lastName
          firstName
        }
        
        accounts {
          account {
            id
          }
        }
      }`
    )

    const self = members.filter(x => x.user.id === user.id)[0]
    const member = members.filter(x => x.user.id === args.id)[0]

    if (!self || !member) {
      return undefined
    }

    const result = {
      id: member.user.id,
      self: member === self,
      email: member.user.email,
      lastName: member.user.lastName,
      firstName: member.user.firstName,
      avatar: {},
      admin: member.role === 'ADMIN',
      canInvite: member.canInvite,
      accountIds: member
        .accounts!.map(({ id }) => id)
        .filter(id => self.accounts!.filter(x => x.id === id).length),
      acl: {
        remove: self.role === 'ADMIN' && member !== self,
        editRole: self.role === 'ADMIN',
        editAvatar: self.role === 'ADMIN' || member === self,
        editProfile: self.role === 'ADMIN' || member === self,
        editPassword: member === self,
      },
    }

    return result
  }
)

export default teamMembers
