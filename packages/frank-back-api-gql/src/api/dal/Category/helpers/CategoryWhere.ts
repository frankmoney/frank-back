import { CategoryType } from 'store/enums'
import AccountWhere from '../../Account/helpers/AccountWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import WhereStringEnum from '../../helpers/WhereStringEnum'
import CategoryPaymentsWhere from './CategoryPaymentsWhere'

export default interface CategoryWhere {
  id?: WhereId
  pid?: WherePid
  type?: WhereStringEnum<CategoryType>
  name?: WhereString
  account?: AccountWhere
  payments?: CategoryPaymentsWhere
  or?: CategoryWhere | CategoryWhere[]
  and?: CategoryWhere | CategoryWhere[]
}
