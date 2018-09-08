import createMutations from 'utils/createMutations'
import onboardingCancel from './onboardingCancel'
import onboardingEnterCredentials from './onboardingEnterCredentials'
import onboardingSelectInstitution from './onboardingSelectInstitution'

export default createMutations(field => ({
  ...onboardingCancel(field),
  ...onboardingEnterCredentials(field),
  ...onboardingSelectInstitution(field),
}))
