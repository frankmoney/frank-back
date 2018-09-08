import {
  KeyValuePair,
  contains,
  find,
  fromPairs,
  identity,
  pathEq,
} from 'ramda'
import {
  Account,
  Team,
  TeamMember,
  TeamWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import getTeamMemberAcl from 'utils/getTeamMemberAcl'

const teamMembers = createPrivateResolver(
  'Team:members',
  async ({ user, parent, prisma: { query } }) => {
    const where: TeamWhereInput = {
      id: parent.id,
    }

    const team = await query.team<Team>(
      { where },
      `{
      id
      name
      
      accounts {
        id
        name
      }
      
      members {
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
      }
    }`
    )

    const self = find(pathEq(['user', 'id'], user.id), team.members!)!

    const accountIds = self.accounts!.map(x => x.account.id)

    const accounts = fromPairs(
      team
        .accounts!.filter(({ id }) => contains(id, accountIds))
        .map(x => <KeyValuePair<string, Account>>[x.id, x])
    )

    const getAcl = (member: TeamMember) => getTeamMemberAcl(self, member)

    const result = team.members!.map(member => ({
      id: member.user.id,
      self: member === self,
      email: member.user.email,
      lastName: member.user.lastName,
      firstName: member.user.firstName,
      avatar: {},
      admin: member.role === 'ADMIN',
      canInvite: member.canInvite,
      accountIds: member
        .accounts!.map(x => accounts[x.account.id])
        .filter(identity)
        .map(({ id }) => id),
      acl: getAcl(member),
    }))

    return result
  }
)

export default teamMembers
