import onboardingBack from 'app/graphql/resolvers/onboardingBack'
import createMutations from 'utils/createMutations'
import onboardingEnterCredentials from 'app/graphql/resolvers/onboardingEnterCredentials'
import onboardingCancel from 'app/graphql/resolvers/onboardingCancel'
import onboardingSelectInstitution from 'app/graphql/resolvers/onboardingSelectInstitution'
import onboardingSelectAccount from 'app/graphql/resolvers/onboardingSelectAccount'
import onboardingUpdateAccountInfo from 'app/graphql/resolvers/onboardingUpdateAccountInfo'
import onboardingFinish from 'app/graphql/resolvers/onboardingFinish'
import onboardingUpdateCategories from 'app/graphql/resolvers/onboardingUpdateCategories'
import onboardingCompleteAccountInfo from 'app/graphql/resolvers/onboardingCompleteAccountInfo'
import onboardingEnterMfaCredentials from 'app/graphql/resolvers/onboardingEnterMfaCredentials'

export default createMutations(field => ({
  ...onboardingCancel(field),
  ...onboardingEnterCredentials(field),
  ...onboardingEnterMfaCredentials(field),
  ...onboardingSelectInstitution(field),
  ...onboardingSelectAccount(field),
  ...onboardingUpdateAccountInfo(field),
  ...onboardingCompleteAccountInfo(field),
  ...onboardingUpdateCategories(field),
  ...onboardingFinish(field),
  ...onboardingBack(field),
}))
