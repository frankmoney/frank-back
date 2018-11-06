import { Enum } from 'gql'

const LedgerBarChartPeriodType = Enum('LedgerBarChartPeriod', type =>
  type.values(['year', 'quarter', 'month', 'week', 'day'])
)

export default LedgerBarChartPeriodType
