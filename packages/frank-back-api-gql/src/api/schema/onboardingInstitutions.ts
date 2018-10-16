import AtriumClient from 'api/onboarding/atriumClient'
import humps from 'humps'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'

export default createPrivateResolver(
  'onboardingInstitutions',
  async ({ args: { name } }) => {
    const { institutions } = await AtriumClient.listInstitutions({
      params: {
        name,
      },
    })

    return humps.camelizeKeys(institutions)
  },
)
