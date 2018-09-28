import teamMemberInvite, {
  TeamMemberInviteData,
} from '@frankmoney/frank-mail/teamMemberInvite'
import createClient from './createClient'

export type SendInviteArgs = TeamMemberInviteData

const sendInvite = async (args: SendInviteArgs): Promise<void> => {
  const client = createClient()

  try {
    const { subject, html } = teamMemberInvite({ data: args })

    const data = {
      from: 'Team Invitations <dev@frank.ly>',
      to: args.invitee.email,
      subject,
      html,
    }

    const result = await client.messages().send(data)

    client.log.info(
      `Sent invite mail to ${args.invitee.email} with link ${args.link}`
    )
    client.log.trace('mailgun response:', result)
  } catch (exc) {
    client.log.error(
      `Failed to send invite mail to ${args.invitee.email} with link ${
        args.link
      }:\r\n${exc}`
    )
    throw exc
  }
}

export default sendInvite
