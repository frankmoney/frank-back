import { Input, String } from 'gql'

const UpdatePeerUpdateInput = Input('UpdatePeerUpdateInput', type =>
  type.fields(field => ({
    name: field.ofType(String),
  }))
)

export default UpdatePeerUpdateInput
