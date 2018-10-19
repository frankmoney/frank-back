import { Input } from 'gql'

const PeerUpdateUpdateInput = Input('PeerUpdateUpdate', type =>
  type.fields(field => ({
    name: field.ofString(),
  }))
)

export default PeerUpdateUpdateInput
