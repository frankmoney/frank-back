import { Type } from 'gql'
import LedgerPieChartItemType from './LedgerPieChartItemType'

const LedgerPieChartType = Type('LedgerPieChart', type =>
  type.fields(field => ({
    items: field.listOf(LedgerPieChartItemType),
  }))
)

export default LedgerPieChartType
