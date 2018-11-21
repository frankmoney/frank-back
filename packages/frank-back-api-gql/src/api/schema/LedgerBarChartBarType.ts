import { Type } from 'gql'

const LedgerBarChartBarType = Type('LedgerBar', type =>
  type.fields(field => ({
    showDate: field.ofDate(),
    startDate: field.ofDate(),
    endDate: field.ofDate(),
    revenue: field.ofFloat(),
    spending: field.ofFloat(),
  }))
)

export default LedgerBarChartBarType
