import createClient from './createClient'

export type SendInviteArgs = {
  email: string
  link: string
  note?: string
}

const sendInvite = async ({
  email,
  link,
  note,
}: SendInviteArgs): Promise<void> => {
  const client = createClient()

  try {
    const data = {
      from: 'Team Invitations <dev@frank.ly>',
      to: email,
      subject: 'Frank Team Invitation',
      text: `${link}${note ? `\r\n\r\n${note}` : ''}`,
    }

    const result = await client.messages().send(data)

    client.log.info(`Sent invite mail to ${email} with link ${link}`)
    client.log.trace('mailgun response:', result)
  } catch (exc) {
    client.log.error(
      `Failed to send invite mail to ${email} with link ${link}:\r\n${exc}`
    )
    throw exc
  }
}

export default sendInvite
