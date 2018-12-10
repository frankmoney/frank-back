import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'

export default interface AccountWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  or?: AccountWhere | AccountWhere[]
  and?: AccountWhere | AccountWhere[]
}
