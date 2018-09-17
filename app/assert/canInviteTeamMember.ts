import { throwForbidden } from 'app/errors/ForbiddenError'
import { Query } from 'app/graphql/generated/prisma'
import TeamMemberRoleEnum from 'app/graphql/schema/TeamMemberRoleEnum'
import mapTeamMemberRoleToPrisma from 'utils/mapTeamMemberRoleToPrisma'

const assertCanInviteTeamMember = async (
  userId: string,
  { query }: { query: Query }
) => {
  const entries = await query.teamMembers({
    where: {
      user: {
        id: userId,
      },
      role: mapTeamMemberRoleToPrisma(
        TeamMemberRoleEnum.values.administrator
      ),
    },
  }, `{ team { id } }`)

  if (!entries || !entries[0]) {
    throwForbidden()
  }

  return { teamId: entries[0].team.id }
}

export default assertCanInviteTeamMember
