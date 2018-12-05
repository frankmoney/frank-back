import { Input } from 'gql'

const OnboardingCategoryCreateInput = Input('OnboardingCategoryCreate', type =>
  type.fields(field => ({
    name: field.ofString(),
    color: field.ofString(),
  }))
)

export default OnboardingCategoryCreateInput
