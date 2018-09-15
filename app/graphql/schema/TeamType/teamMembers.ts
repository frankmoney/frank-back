import { find, pathEq } from 'ramda'
import { Team, TeamMember, TeamWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import getTeamMemberAcl from 'utils/getTeamMemberAcl'
import mapTeamMemberRoleFromPrisma from 'utils/mapTeamMemberRoleFromPrisma'

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

    const getAcl = (member: TeamMember) => getTeamMemberAcl(self, member)

    const result = team.members!.map(member => ({
      id: member.user.id,
      self: member === self,
      email: member.user.email,
      lastName: member.user.lastName,
      firstName: member.user.firstName,
      avatar: {},
      role: mapTeamMemberRoleFromPrisma(member.role),
      acl: getAcl(member),
    }))

    return result
  }
)

export default teamMembers
