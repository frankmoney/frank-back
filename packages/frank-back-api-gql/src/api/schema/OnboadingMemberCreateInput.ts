import { Input } from 'gql'

const OnboadingMemberCreateInput = Input('OnboadingMemberCreate', type =>
  type.fields(field => ({
    role: field.ofString(),
    email: field.ofString(),
    note: field.ofString().nullable(),
  }))
)

export default OnboadingMemberCreateInput
