import { Enum } from 'gql'

const PaymentsOrderType = Enum('PaymentsOrder', type =>
  type.values(['postedOn_ASC', 'postedOn_DESC', 'amount_DESC'])
)

export default PaymentsOrderType
