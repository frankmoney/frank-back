import PaymentWhere from '../../Payment/helpers/PaymentWhere'

export default interface CategoryPaymentsWhere {
  empty?: boolean
  any?: PaymentWhere
  none?: PaymentWhere
  or?: CategoryPaymentsWhere | CategoryPaymentsWhere[]
  and?: CategoryPaymentsWhere | CategoryPaymentsWhere[]
}
