import createMutations from 'utils/createMutations'
import onboardingEnterCredentials from 'app/graphql/resolvers/onboardingEnterCredentials'
import onboardingCancel from 'app/graphql/resolvers/onboardingCancel'
import onboardingSelectInstitution from 'app/graphql/resolvers/onboardingSelectInstitution'
import onboardingSelectAccount from 'app/graphql/resolvers/onboardingSelectAccount'
import onboardingUpdateAccountInfo from 'app/graphql/resolvers/onboardingUpdateAccountInfo'

export default createMutations(field => ({
  ...onboardingCancel(field),
  ...onboardingEnterCredentials(field),
  ...onboardingSelectInstitution(field),
  ...onboardingSelectAccount(field),
  ...onboardingUpdateAccountInfo(field),
}))
