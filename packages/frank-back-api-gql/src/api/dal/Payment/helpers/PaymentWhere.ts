import AccountWhere from '../../Account/helpers/AccountWhere'
import CategoryWhere from '../../Category/helpers/CategoryWhere'
import PeerWhere from '../../Peer/helpers/PeerWhere'
import WhereBoolean from '../../helpers/WhereBoolean'
import WhereDate from '../../helpers/WhereDate'
import WhereNumber from '../../helpers/WhereNumber'

export default interface PaymentWhere {
  amount?: WhereNumber
  postedOn?: WhereDate
  verified?: WhereBoolean
  pending?: WhereBoolean
  containsText?: string
  account?: AccountWhere
  category?: CategoryWhere
  peer?: PeerWhere
  or?: PaymentWhere | PaymentWhere[]
  and?: PaymentWhere | PaymentWhere[]
}
