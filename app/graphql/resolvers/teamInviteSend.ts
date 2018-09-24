import sendInvite from 'app/mail/sendInvite'
import createPrivateResolver from 'utils/createPrivateResolver'
import mapTeamMemberRoleFromPrisma from 'utils/mapTeamMemberRoleFromPrisma'
import mapTeamMemberRoleToPrisma from 'utils/mapTeamMemberRoleToPrisma'

const teamInviteSend = createPrivateResolver(
  'TeamInvite:send',
  async ({ assert, user, args, prisma: { mutation } }) => {
    const { teamId } = await assert.canInviteTeamMember()

    await mutation.deleteManyTeamInvites({
      where: { team: { id: teamId }, email: args.email },
    })

    const invite = await mutation.createTeamInvite(
      {
        data: {
          email: args.email,
          role: mapTeamMemberRoleToPrisma(args.role),
          note: args.note,
          team: {
            connect: {
              id: teamId,
            },
          },
          inviter: {
            connect: {
              id: user.id,
            },
          },
        },
      },
      `{ id, email, role, note, team { name }, inviter { lastName, firstName } }`
    )

    const link = `/onboarding/accept-invitation/${invite.id}`

    await sendInvite({
      inviter: invite.inviter,
      team: invite.team,
      invitee: {
        email: invite.email,
      },
      note: invite.note,
      link,
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
