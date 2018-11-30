import { Input } from 'gql'

const OnboardingCredentialsInput = Input('OnboardingCredentials', type =>
  type.fields(field => ({
    guid: field.ofString(),
    value: field.ofString(),
  }))
)

export default OnboardingCredentialsInput
