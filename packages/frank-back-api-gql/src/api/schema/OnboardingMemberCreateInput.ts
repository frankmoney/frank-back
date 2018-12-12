import { Input } from 'gql'

const OnboardingMemberCreateInput = Input('OnboardingMemberCreate', type =>
  type.fields(field => ({
    email: field.ofString(),
    note: field.ofString().nullable(),
  }))
)

export default OnboardingMemberCreateInput
