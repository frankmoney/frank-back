import { Input } from 'gql'

const AccountUpdateUpdateInput = Input('AccountUpdateUpdate', type =>
  type.fields(field => ({
    name: field.ofString().nullable(),
    description: field.ofString().nullable(),
    public: field.ofBool().nullable(),
  }))
)

export default AccountUpdateUpdateInput
