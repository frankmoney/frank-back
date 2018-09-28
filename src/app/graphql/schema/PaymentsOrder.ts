import { Enum } from 'gql'

const PaymentsOrder = Enum('PaymentsOrder', type =>
  type.values(['postedOn_DESC', 'amount_DESC'])
)

export default PaymentsOrder
