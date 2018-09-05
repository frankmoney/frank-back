import { Enum } from 'gql'

const PeersOrder = Enum('PeersOrder', type =>
  type.values(['name_ASC', 'total_DESC', 'lastPaymentOn_DESC'])
)

export default PeersOrder
