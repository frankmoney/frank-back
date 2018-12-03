import { Input } from 'gql'

const OnboadingCategoryCreateInput = Input('OnboadingCategoryCreate', type =>
  type.fields(field => ({
    name: field.ofString(),
    color: field.ofString(),
  }))
)

export default OnboadingCategoryCreateInput
