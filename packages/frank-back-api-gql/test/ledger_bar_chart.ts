import assert from 'assert'
import ledgerBarChart from '../src/api/ledger_bar_chart'
import {} from 'date-fns'

describe('LedgerBarChart', () => {
  describe('1 month (days)', () => {
    it('1.1-2.1', () => {
      const result = ledgerBarChart(
        null,
        new Date(2017, 0, 1),
        new Date(2017, 1, 1)
      )

      assert.strictEqual(result.barSize, 'day')
      assert.strictEqual(result.bars.length, 31)
    })

    it('1.30-2.1', () => {
      const result = ledgerBarChart(
        null,
        new Date(2017, 1, 30),
        new Date(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'day')
      // assert.strictEqual(result.bars.length, 31)
    })
  })

  describe('2 month (week)', () => {
    it('1.1-3.1', () => {
      const result = ledgerBarChart(
        null,
        new Date(2017, 0, 1),
        new Date(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 9)
    })

    it('12.1-2.1', () => {
      const result = ledgerBarChart(
        null,
        new Date(2016, 11, 1),
        new Date(2017, 1, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 10)
    })
  })
})
