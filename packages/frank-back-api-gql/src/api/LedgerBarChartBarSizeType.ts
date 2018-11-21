import { Enum } from 'gql'

const LedgerBarChartBarSizeType = Enum('LedgerBarChartBarSize', type =>
  type.values(['day', 'week', 'month', 'quarter', 'year'])
)

export default LedgerBarChartBarSizeType
