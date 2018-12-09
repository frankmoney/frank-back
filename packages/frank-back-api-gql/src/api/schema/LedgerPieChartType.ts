import { Type } from 'gql'
import LedgerPieChartItemType from './LedgerPieChartItemType'

const LedgerPieChartType = Type('LedgerPieChart', type =>
  type.fields(field => ({
    totalRevenue: field.ofFloat(),
    totalSpending: field.ofFloat(),
    items: field.listOf(LedgerPieChartItemType),
  }))
)

export default LedgerPieChartType
