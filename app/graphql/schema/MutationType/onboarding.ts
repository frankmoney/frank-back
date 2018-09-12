import createMutations from 'utils/createMutations'
import onboardingEnterCredentials from 'app/graphql/resolvers/onboardingEnterCredentials'
import onboardingCancel from 'app/graphql/resolvers/onboardingCancel'
import onboardingSelectInstitution from 'app/graphql/resolvers/onboardingSelectInstitution'

export default createMutations(field => ({
  ...onboardingCancel(field),
  ...onboardingEnterCredentials(field),
  ...onboardingSelectInstitution(field),
}))
