import PaymentWhere from '../../Payment/helpers/PaymentWhere'

export default interface AccountPaymentsWhere {
  empty?: boolean
  any?: PaymentWhere
  none?: PaymentWhere
  or?: AccountPaymentsWhere | AccountPaymentsWhere[]
  and?: AccountPaymentsWhere | AccountPaymentsWhere[]
}
