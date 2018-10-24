import Atrium from 'mx-atrium'

const atriumClient = new Atrium.Client(
  process.env.MX_API_KEY,
  process.env.MX_CLIENT_ID,
  Atrium.environments.development
)

export default atriumClient
