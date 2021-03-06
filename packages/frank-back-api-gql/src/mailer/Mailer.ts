import { TemplateResult } from '@frankmoney/frank-mail/types'
import mailgun, { Mailgun, Messages } from 'mailgun-js'
import { Log } from 'log'

export interface MailerScope {
  logFor: (name: string) => Log
  mailgunDomain: string
  mailgunApiKey: string
  from: string
  debugEmailAddress?: string
}

export default class Mailer {
  public static create(scope: MailerScope) {
    const log = scope.logFor('Mailer')

    const client = mailgun({
      domain: scope.mailgunDomain,
      apiKey: scope.mailgunApiKey,
    })

    return new Mailer(log, scope.from, client, scope.debugEmailAddress)
  }

  public readonly log: Log
  public readonly from: string
  public readonly client: Mailgun
  public readonly messages: Messages
  public readonly debugEmailAddress?: string

  public constructor(
    log: Log,
    from: string,
    client: Mailgun,
    debugEmailAddress?: string
  ) {
    this.log = log
    this.from = from
    this.client = client
    this.messages = client.messages()
    this.debugEmailAddress = debugEmailAddress
  }

  public async send(
    { to }: { to: string },
    { subject, html }: TemplateResult
  ): Promise<void> {
    try {
      const req = {
        from: this.from,
        to: this.debugEmailAddress || to,
        subject: this.debugEmailAddress
          ? `(Debug redirect) ${subject}`
          : subject,
        html,
      }

      const res = await this.messages.send(req)

      this.log.info(`Sent mail to "${to}" (subj: ${subject})`)
      this.log.trace('mailgun response: %O', res)
    } catch (exc) {
      this.log.error(exc, 'Failed to send mail')
      throw exc
    }
  }
}
