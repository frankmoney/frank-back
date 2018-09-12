import AtriumClient from 'app/onboarding/atriumClient'
import humps from 'humps'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'Mutation:onboarding:institutions',
  async ({ args: { name } }) => {

    const { institutions } = await AtriumClient.listInstitutions({
      params: {
        name,
      },
    })

    return humps.camelizeKeys(institutions)
  },
)
