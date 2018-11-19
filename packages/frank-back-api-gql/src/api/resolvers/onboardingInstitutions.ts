import humps from 'humps'
import createPrivateResolver from './utils/createPrivateResolver'

export default createPrivateResolver(
  'onboardingInstitutions',
  async ({ args: { name }, scope }) => {
    const { institutions } = await scope.mx.listInstitutions({ name })
    return humps.camelizeKeys(institutions)
  }
)
