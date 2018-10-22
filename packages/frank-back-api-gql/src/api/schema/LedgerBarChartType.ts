import { Type } from 'gql'
import LedgerBarChartItemType from './LedgerBarChartItemType'

const LedgerBarChartType = Type('LedgerBarChart', type =>
  type.fields(field => ({
    items: field.listOf(LedgerBarChartItemType),
  }))
)

export default LedgerBarChartType
