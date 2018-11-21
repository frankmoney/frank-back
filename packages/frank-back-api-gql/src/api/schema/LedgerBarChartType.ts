import { Type } from 'gql'

const LedgerBarType = Type('LedgerBar', type => type.fields(field => ({
  showDate: field.ofDate(),
  startDate: field.ofDate(),
  endDate: field.ofDate(),
  income: field.ofFloat(),
  expenses: field.ofFloat(),
})))

const LedgerBarChartType = Type('LedgerBarChart', type =>
  type.fields(field => ({
    barSize: field.ofString(),
    fromDate: field.ofDate(),
    toDate: field.ofDate(),
    maxIncome: field.ofFloat(),
    maxExpenses: field.ofFloat(),
    maxSum: field.ofFloat(),
    totalSum: field.ofFloat(),
    bars: field.listOf(LedgerBarType),
  })),
)

export default LedgerBarChartType
