import { find, pathEq } from 'ramda'
import { throwNotFound } from 'app/errors/NotFoundError'
import { TeamMember } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import getTeamMemberAcl from 'utils/getTeamMemberAcl'
import mapTeamMemberRoleFromPrisma from 'utils/mapTeamMemberRoleFromPrisma'
import mapTeamMemberRoleToPrisma from 'utils/mapTeamMemberRoleToPrisma'

const teamMemberUpdateRole = createPrivateResolver(
  'Mutation:teamMemberUpdateRole',
  async ({ assert, user, args, prisma: { query, mutation } }) => {
    await assert.canUpdateTeamMemberRole(args.id)

    const prismaRole = mapTeamMemberRoleToPrisma(args.role)

    await mutation.updateManyTeamMembers({
      where: { user: { id: args.id } },
      data: { role: prismaRole },
    })

    const members = await query.teamMembers<TeamMember[]>(
      {
        where: {
          OR: [{ user: { id: user.id } }, { user: { id: args.id } }],
          team: {
            members_some: {
              user: {
                id: user.id,
              },
            },
          },
        },
      },
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

    const self = find<TeamMember>(pathEq(['user', 'id'], user.id))(members)
    const other = find<TeamMember>(pathEq(['user', 'id'], args.id))(members)

    if (!self || !other) {
      return throwNotFound()
    }

    const role = mapTeamMemberRoleFromPrisma(other.role)

    const result = {
      id: other.user.id,
      self: other === self,
      email: other.user.email,
      lastName: other.user.lastName,
      firstName: other.user.firstName,
      avatar: {},
      role,
      acl: getTeamMemberAcl(self, other),
    }

    return result
  }
)

export default teamMemberUpdateRole
