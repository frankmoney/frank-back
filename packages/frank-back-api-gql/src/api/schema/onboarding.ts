import createMutations from 'utils/createMutations'
import onboardingBack from 'api/resolvers/mutations/onboardingBack'
import onboardingCancel from 'api/resolvers/mutations/onboardingCancel'
import onboardingCompleteAccountInfo from 'api/resolvers/mutations/onboardingCompleteAccountInfo'
import onboardingEnterCredentials from 'api/resolvers/mutations/onboardingEnterCredentials'
import onboardingEnterMfaChallenges from 'api/resolvers/mutations/onboardingEnterMfaChallenges'
import onboardingFinish from 'api/resolvers/mutations/onboardingFinish'
import onboardingSelectAccount from 'api/resolvers/mutations/onboardingSelectAccount'
import onboardingSelectInstitution from 'api/resolvers/mutations/onboardingSelectInstitution'
import onboardingUpdateAccountInfo from 'api/resolvers/mutations/onboardingUpdateAccountInfo'
import onboardingUpdateTeam from 'api/resolvers/mutations/onboardingUpdateTeam'
import onboardingCompleteRevenueCategories from 'api/resolvers/mutations/onboardingCompleteRevenueCategories'
import onboardingCompleteSpendingCategories from 'api/resolvers/mutations/onboardingCompleteSpendingCategories'
import onboardingUpdateRevenueCategories from 'api/resolvers/mutations/onboardingUpdateRevenueCategories'
import onboardingUpdateSpendingCategories from 'api/resolvers/mutations/onboardingUpdateSpendingCategories'

export default createMutations(field => ({
  ...onboardingSelectInstitution(field),
  ...onboardingEnterCredentials(field),
  ...onboardingEnterMfaChallenges(field),
  ...onboardingSelectAccount(field),
  ...onboardingUpdateAccountInfo(field),
  ...onboardingCompleteAccountInfo(field),
  ...onboardingUpdateSpendingCategories(field),
  ...onboardingUpdateRevenueCategories(field),
  ...onboardingCompleteSpendingCategories(field),
  ...onboardingCompleteRevenueCategories(field),
  ...onboardingUpdateTeam(field),
  ...onboardingFinish(field),
  ...onboardingBack(field),
  ...onboardingCancel(field),
}))
