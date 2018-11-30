import { CategoryType } from 'store/enums'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereStringEnum from '../../helpers/WhereStringEnum'

export default interface CategoryWhere {
  id?: WhereId
  pid?: WherePid
  type?: WhereStringEnum<CategoryType>
}
