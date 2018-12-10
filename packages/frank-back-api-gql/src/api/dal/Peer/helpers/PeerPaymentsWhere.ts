import PaymentWhere from '../../Payment/helpers/PaymentWhere'

export default interface PeerPaymentsWhere {
  empty?: boolean
  any?: PaymentWhere
  none?: PaymentWhere
  or?: PeerPaymentsWhere | PeerPaymentsWhere[]
  and?: PeerPaymentsWhere | PeerPaymentsWhere[]
}
