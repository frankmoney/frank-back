import Atrium from 'mx-atrium'

const environment =
  process.env.ATRIUM_PROD === 'true'
    ? Atrium.environments.production
    : Atrium.environments.development

const atriumClient = new Atrium.Client(
  process.env.MX_API_KEY,
  process.env.MX_CLIENT_ID,
  environment
)

export default atriumClient
