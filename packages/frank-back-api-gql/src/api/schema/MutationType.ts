import { Type } from 'gql'
import updateTeamMemberByPidAndUserId from 'api/dal/TeamMember/updateTeamMemberByPidAndUserId'
import getUserById from 'api/dal/User/getUserById'
import mapTeamMember from 'api/mappers/mapTeamMember'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import TeamMemberRoleType from './TeamMemberRoleType'
import TeamMemberType from './TeamMemberType'
import onboarding from './onboarding'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    teamMemberUpdateRole: field
      .ofType(TeamMemberType)
      .args(arg => ({
        pid: arg.ofId(),
        role: arg.ofType(TeamMemberRoleType),
      }))
      .resolve(
        createPrivateResolver(
          'teamMemberUpdateRole',
          async ({ args, scope }) => {
            const member = await updateTeamMemberByPidAndUserId(
              { userId: scope.user.id, pid: args.pid, role: args.role },
              scope,
            )

            if (!member) {
              return undefined
            }

            const user = await getUserById({ id: member.userId }, scope)

            return mapTeamMember({ member, user, currentUserId: scope.user.id })
          },
        ),
      ),
  })),
)

export default MutationType
