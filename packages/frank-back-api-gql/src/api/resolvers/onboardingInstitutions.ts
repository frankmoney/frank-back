import humps from 'humps'
import createPrivateResolver from './utils/createPrivateResolver'

export default createPrivateResolver(
  'onboardingInstitutions',
  async ({ args: { name }, scope }) => {
    const { institutions } = await scope.mx.listInstitutions({ name })

    if (!institutions) {
      throw new Error("mx.listInstitutions didn't return institutions")
    }

    return humps.camelizeKeys(institutions)
  }
)
