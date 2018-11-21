import { Type } from 'gql'
import CategoryType from './CategoryType'

const LedgerPieChartItemType = Type('LedgerPieChartItem', type =>
  type.fields(field => ({
    category: field.ofType(CategoryType).nullable(),
    revenue: field.ofFloat(),
    spending: field.ofFloat(),
  }))
)

export default LedgerPieChartItemType
