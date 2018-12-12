import TeamWhere from '../../Team/helpers/TeamWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import AccountCategoriesWhere from './AccountCategoriesWhere'
import AccountPeersWhere from './AccountPeersWhere'
import AccountPaymentsWhere from './AccountPaymentsWhere'

export default interface AccountWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  team?: TeamWhere
  categories?: AccountCategoriesWhere
  peers?: AccountPeersWhere
  payments?: AccountPaymentsWhere
  or?: AccountWhere | AccountWhere[]
  and?: AccountWhere | AccountWhere[]
}
