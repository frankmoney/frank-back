import { Enum } from 'gql'

const PeersOrder = Enum('PeersOrder', type =>
  type.values(['name', 'lastPaymentDate', 'total', 'revenue', 'spending'])
)

export default PeersOrder
