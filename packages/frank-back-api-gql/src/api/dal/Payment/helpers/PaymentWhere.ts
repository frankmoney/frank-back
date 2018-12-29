import AccountWhere from '../../Account/helpers/AccountWhere'
import CategoryWhere from '../../Category/helpers/CategoryWhere'
import WherePid from '../../helpers/WherePid'
import PeerWhere from '../../Peer/helpers/PeerWhere'
import WhereBoolean from '../../helpers/WhereBoolean'
import WhereDate from '../../helpers/WhereDate'
import WhereNumber from '../../helpers/WhereNumber'
import PaymentStoriesWhere from './PaymentStoriesWhere'

export default interface PaymentWhere {
  pid?: WherePid
  amount?: WhereNumber
  postedOn?: WhereDate
  verified?: WhereBoolean
  pending?: WhereBoolean
  containsText?: string
  account?: AccountWhere
  category?: CategoryWhere
  peer?: PeerWhere
  stories?: PaymentStoriesWhere
  or?: PaymentWhere | PaymentWhere[]
  and?: PaymentWhere | PaymentWhere[]
}
