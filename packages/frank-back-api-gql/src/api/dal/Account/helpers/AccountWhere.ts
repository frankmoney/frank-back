import WhereBoolean from '../../helpers/WhereBoolean'
import TeamWhere from '../../Team/helpers/TeamWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import AccountCategoriesWhere from './AccountCategoriesWhere'
import AccountPeersWhere from './AccountPeersWhere'
import AccountPaymentsWhere from './AccountPaymentsWhere'
import AccountStoriesWhere from './AccountStoriesWhere'

export default interface AccountWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  public?: WhereBoolean
  team?: TeamWhere
  categories?: AccountCategoriesWhere
  peers?: AccountPeersWhere
  payments?: AccountPaymentsWhere
  stories?: AccountStoriesWhere
  or?: AccountWhere | AccountWhere[]
  and?: AccountWhere | AccountWhere[]
}
