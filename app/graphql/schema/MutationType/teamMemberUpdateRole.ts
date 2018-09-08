import { ID } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import getTeamMemberAcl from 'utils/getTeamMemberAcl'
import { throwForbidden } from 'app/errors/ForbiddenError'
import {
  Query,
  TeamMember,
  TeamMemberWhereInput,
} from 'app/graphql/generated/prisma'
import TeamMemberType from 'app/graphql/schema/TeamMemberType'

const getTeamMember = async ({
  user,
  args,
  query,
}: {
  user: { id: string }
  args: { id: string }
  query: Query
}) => {
  const where: TeamMemberWhereInput = {
    OR: [
      {
        id: user.id,
      },
      {
        id: args.id,
      },
    ],
    team: {
      members_some: {
        user: {
          id: user.id,
        },
      },
    },
  }

  const members = await query.teamMembers<TeamMember[]>(
    { where },
    `{
      id
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
    acl: getTeamMemberAcl(self, member),
  }

  return result
}

export default createMutations(field => ({
  teamMemberUpdateRole: field
    .ofType(TeamMemberType)
    .args(arg => ({
      id: arg.ofID(),
      admin: arg.ofBool(),
      canInvite: arg.ofBool(),
      accountIds: arg.listOf(ID),
    }))
    .resolve(
      createPrivateResolver(
        'Mutation:teamMemberUpdateRole',
        async ({ user, args, prisma: { query, mutation } }) => {
          const where: TeamMemberWhereInput = {
            user: {
              OR: [{ id: args.id }, { id: user.id }],
            },
            team: {
              members_some: {
                user: {
                  id: user.id,
                },
              },
            },
          }

          const members = await query.teamMembers<TeamMember[]>(
            { where },
            `{
              id
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

          if (!self || !member || !getTeamMemberAcl(self, member).editRole) {
            throwForbidden()
          }

          await mutation.deleteManyTeamMemberAccounts({
            where: {
              teamMember: {
                id: member.id,
              },
            },
          })

          await mutation.updateTeamMember({
            where: { id: member.id },
            data: {
              role: args.admin ? 'ADMIN' : 'MEMBER',
              canInvite: args.canInvite,
              accounts: args.accountIds.map((id: string) => ({
                create: {
                  account: {
                    connect: {
                      id,
                    },
                  },
                },
              })),
            },
          })

          const result = await getTeamMember({
            user,
            args,
            query,
          })

          return result
        }
      )
    ),
}))
