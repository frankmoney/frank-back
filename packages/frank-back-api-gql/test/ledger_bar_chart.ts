import assert from 'assert'
import ledgerBarChart from '../src/api/ledger_bar_chart'
import {} from 'date-fns'

//  дни 1 месяц                  30 баров
//  недели 2-8 месяцев     8-32 недели
//  месяцы 9-23 месяца    9-23 месяца
//  кварталы 2-8 лет          8-32 квартала
//  годы 9+ лет  ....             9+ лет

const NormalDate = (y: number, m: number, d: number): Date => {
  return new Date(y, m - 1, d)
}

describe('LedgerBarChart', () => {
  describe('1 month (days)', () => {
    it('1.1-2.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'day')
      assert.strictEqual(result.bars.length, 31)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-02-01')
    })

    it('1.30-2.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2017, 1, 30),
        NormalDate(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'day')
      assert.strictEqual(result.bars.length, 31)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-02-01')
    })
  })

  describe('2 month (week)', () => {
    it('1.1-3.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 3, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 9)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-03-01')
    })

    it('12.1-2.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2016, 12, 1),
        NormalDate(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 10)
      assert.strictEqual(result.fromDate, '2016-12-01')
      assert.strictEqual(result.toDate, '2017-02-01')
    })
  })

  describe('3 months (week)', () => {
    it('1.1-4.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 4, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 13)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-04-01')
    })

    it('12.1-3.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2016, 12, 1),
        NormalDate(2017, 3, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 14)
      assert.strictEqual(result.fromDate, '2016-12-01')
      assert.strictEqual(result.toDate, '2017-03-01')
    })
  })

  describe('4 months (week)', () => {})

  describe('5 months (week)', () => {})

  describe('6 months (week)', () => {})

  describe('8 months (week)', () => {
    it('1.1-9.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 9, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 35)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-09-01')
    })
  })

  describe('15 months (months)', () => {
    it('16.1.1-17.4.1', () => {
      const result = ledgerBarChart(
        null,
        NormalDate(2016, 1, 1),
        NormalDate(2017, 4, 1)
      )

      assert.strictEqual(result.barSize, 'month')
      assert.strictEqual(result.bars.length, 15)
      assert.strictEqual(result.fromDate, '2016-01-01')
      assert.strictEqual(result.toDate, '2017-04-01')
    })
  })
})
