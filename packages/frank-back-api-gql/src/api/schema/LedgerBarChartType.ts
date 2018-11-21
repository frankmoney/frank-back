import { Type } from 'gql'
import LedgerBarChartBarSizeType from '../LedgerBarChartBarSizeType'
import LedgerBarChartBarType from './LedgerBarChartBarType'

const LedgerBarChartType = Type('LedgerBarChart', type =>
  type.fields(field => ({
    fromDate: field.ofDate(),
    toDate: field.ofDate(),
    barSize: field.ofType(LedgerBarChartBarSizeType),
    total: field.ofFloat(),
    maxTotal: field.ofFloat(),
    maxRevenue: field.ofFloat(),
    maxSpending: field.ofFloat(),
    bars: field.listOf(LedgerBarChartBarType),
  }))
)

export default LedgerBarChartType
