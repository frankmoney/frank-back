import createMutations from 'utils/createMutations'
import getTeam from 'api/dal/Team/getTeam'
import getTeamMemberInvite from 'api/dal/TeamMemberInvite/getTeamMemberInvite'
import mapTeam from 'api/mappers/mapTeam'
import TeamType from 'api/schema/TeamType'
import { TeamMemberRole } from 'store/enums'
import createTeamMember from 'api/dal/TeamMember/createTeamMember'
import deleteTeamMember from 'api/dal/TeamMember/deleteTeamMember'
import updateTeamMemberInvite from 'api/dal/TeamMemberInvite/updateTeamMemberInvite'
import { argumentError } from 'api/errors/ArgumentError'
import createPrivateResolver from '../utils/createPrivateResolver'

export default createMutations(field => ({
  acceptInvite: field
    .ofType(TeamType)
    .args(arg => ({
      token: arg.ofString(),
    }))
    .resolve(
      createPrivateResolver(
        'acceptInvite',
        async ({ args: { token }, scope }) => {
          const teamMemberInvite = await getTeamMemberInvite(
            {
              where: {
                token: { eq: token },
              },
            },
            scope
          )

          if (!teamMemberInvite) {
            throw argumentError('Invalid invite token')
          }

          if (teamMemberInvite.usedAt) {
            throw argumentError('Invite already used')
          }

          const newTeam = await getTeam(
            {
              where: {
                id: { eq: teamMemberInvite.teamId },
              },
            },
            scope
          )

          const currentUserId = scope.user.id

          // kick user from old teams
          await deleteTeamMember(
            {
              userId: currentUserId,
            },
            scope
          )

          // attach user to new team
          await createTeamMember(
            {
              teamId: newTeam.id,
              userId: currentUserId,
              roleId: teamMemberInvite.roleId || TeamMemberRole.observer,
            },
            scope
          )

          // invalidate invite
          await updateTeamMemberInvite(
            {
              teamMemberInviteId: teamMemberInvite.id,
              usedAt: new Date().toISOString(),
              userId: currentUserId,
            },
            scope
          )

          // return new team
          return mapTeam(newTeam)
        }
      )
    ),
}))
