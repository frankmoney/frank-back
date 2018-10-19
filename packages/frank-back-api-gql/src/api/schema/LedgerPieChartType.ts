import { Type } from 'gql'
import LedgerPieChartItemType from './LedgerPieChartItem'

const LedgerPieChartType = Type('LedgerPieChart', type =>
  type.fields(field => ({
    items: field.listOf(LedgerPieChartItemType),
  }))
)

export default LedgerPieChartType
