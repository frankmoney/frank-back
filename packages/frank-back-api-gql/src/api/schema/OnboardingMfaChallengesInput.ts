import { Input } from 'gql'

const OnboardingMfaChallengesInput = Input('OnboardingMfaChallenges', type =>
  type.fields(field => ({
    guid: field.ofString(),
    value: field.ofString(),
  }))
)

export default OnboardingMfaChallengesInput
