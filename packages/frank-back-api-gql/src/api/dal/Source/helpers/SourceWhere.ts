import AccountWhere from '../../Account/helpers/AccountWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'

export default interface SourceWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  account?: AccountWhere
  or?: SourceWhere | SourceWhere[]
  and?: SourceWhere | SourceWhere[]
}
