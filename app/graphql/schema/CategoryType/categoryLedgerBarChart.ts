import createLedgerBarChartResolver from '../../resolvers/createLedgerBarChartResolver'

export default createLedgerBarChartResolver(
  'Category:ledgerBarChart',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
