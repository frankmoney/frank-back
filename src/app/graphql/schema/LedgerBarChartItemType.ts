import { Type } from 'gql'

const LedgerBarChartItemType = Type('LedgerBarChartItem', type =>
  type.fields(field => ({
    date: field.ofDate(),
    revenue: field.ofFloat(),
    spending: field.ofFloat(),
  }))
)

export default LedgerBarChartItemType
