import humps from 'humps'
import AtriumClient from 'api/onboarding/atriumClient'
import createPrivateResolver from './utils/createPrivateResolver'

export default createPrivateResolver(
  'onboardingInstitutions',
  async ({ args: { name } }) => {
    const { institutions } = await AtriumClient.listInstitutions({
      params: {
        name,
      },
    })

    return humps.camelizeKeys(institutions)
  }
)
