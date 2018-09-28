import onboardingBack from 'app/graphql/resolvers/onboardingBack'
import onboardingCompleteCategories from 'app/graphql/resolvers/onboardingCompleteCategories'
import onboardingUpdateTeam from 'app/graphql/resolvers/onboardingUpdateTeam'
import createMutations from 'utils/createMutations'
import onboardingEnterCredentials from 'app/graphql/resolvers/onboardingEnterCredentials'
import onboardingCancel from 'app/graphql/resolvers/onboardingCancel'
import onboardingSelectInstitution from 'app/graphql/resolvers/onboardingSelectInstitution'
import onboardingSelectAccount from 'app/graphql/resolvers/onboardingSelectAccount'
import onboardingUpdateAccountInfo from 'app/graphql/resolvers/onboardingUpdateAccountInfo'
import onboardingFinish from 'app/graphql/resolvers/onboardingFinish'
import onboardingUpdateCategories from 'app/graphql/resolvers/onboardingUpdateCategories'
import onboardingCompleteAccountInfo from 'app/graphql/resolvers/onboardingCompleteAccountInfo'
import onboardingEnterMfaChallenges from 'app/graphql/resolvers/onboardingEnterMfaChallenges'

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
