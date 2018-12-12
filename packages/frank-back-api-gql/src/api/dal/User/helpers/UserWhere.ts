import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'

export default interface UserWhere {
  id?: WhereId
  pid?: WherePid
  or?: UserWhere | UserWhere[]
  and?: UserWhere | UserWhere[]
}
