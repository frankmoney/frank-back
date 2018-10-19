import onboardingBack from 'api/resolvers/mutations/onboardingBack'
import onboardingCompleteCategories from 'api/resolvers/mutations/onboardingCompleteCategories'
import onboardingUpdateTeam from 'api/resolvers/mutations/onboardingUpdateTeam'
import createMutations from 'utils/createMutations'
import onboardingEnterCredentials from 'api/resolvers/mutations/onboardingEnterCredentials'
import onboardingCancel from 'api/resolvers/mutations/onboardingCancel'
import onboardingSelectInstitution from 'api/resolvers/mutations/onboardingSelectInstitution'
import onboardingSelectAccount from 'api/resolvers/mutations/onboardingSelectAccount'
import onboardingUpdateAccountInfo from 'api/resolvers/mutations/onboardingUpdateAccountInfo'
import onboardingFinish from 'api/resolvers/mutations/onboardingFinish'
import onboardingUpdateCategories from 'api/resolvers/mutations/onboardingUpdateCategories'
import onboardingCompleteAccountInfo from 'api/resolvers/mutations/onboardingCompleteAccountInfo'
import onboardingEnterMfaChallenges from 'api/resolvers/mutations/onboardingEnterMfaChallenges'

export default createMutations(field => ({
  ...onboardingSelectInstitution(field),
  ...onboardingEnterCredentials(field),
  ...onboardingEnterMfaChallenges(field),
  ...onboardingSelectAccount(field),
  ...onboardingUpdateAccountInfo(field),
  ...onboardingCompleteAccountInfo(field),
  ...onboardingUpdateCategories(field),
  ...onboardingCompleteCategories(field),
  ...onboardingUpdateTeam(field),
  ...onboardingFinish(field),
  ...onboardingBack(field),
  ...onboardingCancel(field),
}))
