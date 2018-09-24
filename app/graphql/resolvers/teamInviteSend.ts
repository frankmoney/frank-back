import sendInvite from 'app/mail/sendInvite'
import createPrivateResolver from 'utils/createPrivateResolver'
import mapTeamMemberRoleFromPrisma from 'utils/mapTeamMemberRoleFromPrisma'
import mapTeamMemberRoleToPrisma from 'utils/mapTeamMemberRoleToPrisma'

const teamInviteSend = createPrivateResolver(
  'TeamInvite:send',
  async ({ assert, args, prisma: { mutation } }) => {
    const { teamId } = await assert.canInviteTeamMember()

    await mutation.deleteManyTeamInvites({
      where: { team: { id: teamId }, email: args.email },
    })

    const invite = await mutation.createTeamInvite(
      {
        data: {
          team: {
            connect: {
              id: teamId,
            },
          },
          email: args.email,
          role: mapTeamMemberRoleToPrisma(args.role),
          note: args.note,
        },
      },
      `{ id, email, role, note }`
    )

    const link = `/onboarding/accept-invitation/${invite.id}`

    await sendInvite({
      email: args.email,
      link,
      note: args.note,
    })

    return {
      id: invite.id,
      email: invite.email,
      role: mapTeamMemberRoleFromPrisma(invite.role),
      note: invite.note,
    }
  }
)

export default teamInviteSend
