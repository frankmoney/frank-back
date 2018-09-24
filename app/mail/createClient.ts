import mailgun from 'mailgun-js'
import createLogger, { Logger } from 'utils/createLogger'

const createClient = () => {
  const mg = mailgun({
    domain: <string>process.env.MAILGUN_DOMAIN,
    apiKey: <string>process.env.MAILGUN_API_KEY,
  })

  return {
    log: createLogger('mail'),
    messages: () => mg.messages(),
  }
}

export default createClient
