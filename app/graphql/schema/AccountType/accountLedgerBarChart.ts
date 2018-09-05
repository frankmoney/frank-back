import createLedgerBarChartResolver from '../../resolvers/createLedgerBarChartResolver'

export default createLedgerBarChartResolver(
  'Account:ledgerBarChart',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
