import humps from 'humps'
import hcb from './../hcb'
import createPrivateResolver from './utils/createPrivateResolver'

export default createPrivateResolver(
  'onboardingInstitutions',
  async ({ args: { name }, scope }) => {
    const { institutions } = await scope.mx.listInstitutions({ name })

    if (!institutions) {
      //throw new Error("mx.listInstitutions didn't return institutions")

      return humps.camelizeKeys([hcb.institution])
    }

    if ((!name && name.length === 0) || (name && name.length > 0 && hcb.isMatchSearch(name))) {
      
    	institutions.unshift(hcb.institution)
    }

    return humps.camelizeKeys(institutions)
  }
)
