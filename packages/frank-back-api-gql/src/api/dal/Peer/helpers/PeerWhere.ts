import AccountWhere from '../../Account/helpers/AccountWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import PeerPaymentsWhere from './PeerPaymentsWhere'

export default interface PeerWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  account?: AccountWhere
  payments?: PeerPaymentsWhere
  or?: PeerWhere | PeerWhere[]
  and?: PeerWhere | PeerWhere[]
}
