import assert from 'assert'
import ledgerBarChart from '../src/api/resolvers/ledgerBarChart'
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
    it('1.1-2.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 2, 1)
      )

      assert.strictEqual(result.barSize, 'day')
      assert.strictEqual(result.bars.length, 31)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-02-01')
    })

    it('1.30-2.1', async () => {
      const result = await ledgerBarChart(
        null,
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
    it('1.1-3.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 3, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 9)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-03-01')
    })

    it('12.1-2.1', async () => {
      const result = await ledgerBarChart(
        null,
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
    it('1.1-4.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 4, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 13)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-04-01')
    })

    it('12.1-3.1', async () => {
      const result = await ledgerBarChart(
        null,
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

  describe('4 months (week)', () => {
    it('1.1-5.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 5, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 18)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-05-01')
    })

    it('1.30-5.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 30),
        NormalDate(2017, 5, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 18)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-05-01')
    })
  })

  describe('5 months (week)', () => {
    it('2.1-7.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 2, 1),
        NormalDate(2017, 7, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 22)
      assert.strictEqual(result.fromDate, '2017-02-01')
      assert.strictEqual(result.toDate, '2017-07-01')
    })

    it('1.30-6.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 30),
        NormalDate(2017, 6, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 22)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-06-01')
    })
  })

  describe('6 months (week)', () => {
    it('1.1-7.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 7, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 26)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-07-01')
    })

    it('11.1-5.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 11, 1),
        NormalDate(2017, 5, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 27)
      assert.strictEqual(result.fromDate, '2016-11-01')
      assert.strictEqual(result.toDate, '2017-05-01')
    })
  })

  describe('8 months (week)', () => {
    it('1.1-9.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2017, 1, 1),
        NormalDate(2017, 9, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 35)
      assert.strictEqual(result.fromDate, '2017-01-01')
      assert.strictEqual(result.toDate, '2017-09-01')
    })

    it('11.1-7.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 11, 1),
        NormalDate(2017, 7, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 35)
      assert.strictEqual(result.fromDate, '2016-11-01')
      assert.strictEqual(result.toDate, '2017-07-01')
    })

    it('2016-04-01  2016-09-01', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 4, 1),
        NormalDate(2016, 9, 1)
      )

      assert.strictEqual(result.barSize, 'week')
      assert.strictEqual(result.bars.length, 23)
      assert.strictEqual(result.fromDate, '2016-04-01')
      assert.strictEqual(result.toDate, '2016-09-01')

      assert.strictEqual(result.bars[0].showDate, '2016-03-27')
      assert.strictEqual(result.bars[0].startDate, '2016-04-01')
      assert.strictEqual(result.bars[0].endDate, '2016-05-01')

      assert.strictEqual(result.bars[1].showDate, '2016-04-03')
      assert.strictEqual(result.bars[1].startDate, '2016-04-01')
      assert.strictEqual(result.bars[1].endDate, '2016-05-01')

      assert.strictEqual(result.bars[2].showDate, '2016-04-10')
      assert.strictEqual(result.bars[2].startDate, '2016-04-01')
      assert.strictEqual(result.bars[2].endDate, '2016-05-01')
    })
  })

  describe('15 months (months)', () => {
    it('16.1.1-17.4.1', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 1, 1),
        NormalDate(2017, 4, 1)
      )

      assert.strictEqual(result.barSize, 'month')
      assert.strictEqual(result.bars.length, 15)
      assert.strictEqual(result.fromDate, '2016-01-01')
      assert.strictEqual(result.toDate, '2017-04-01')

      assert.strictEqual(result.bars[0].showDate, '2016-01-01')
      assert.strictEqual(result.bars[0].startDate, '2016-01-01')
      assert.strictEqual(result.bars[0].endDate, '2016-02-01')

      assert.strictEqual(result.bars[1].showDate, '2016-02-01')
      assert.strictEqual(result.bars[1].startDate, '2016-02-01')
      assert.strictEqual(result.bars[1].endDate, '2016-03-01')

      assert.strictEqual(result.bars[2].showDate, '2016-03-01')
      assert.strictEqual(result.bars[2].startDate, '2016-03-01')
      assert.strictEqual(result.bars[2].endDate, '2016-04-01')
    })
  })

  describe('23 months (months)', () => {
    it('(2016, 1, 1) - (2017, 12, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 1, 1),
        NormalDate(2017, 12, 1)
      )

      assert.strictEqual(result.barSize, 'month')
      assert.strictEqual(result.bars.length, 23)
      assert.strictEqual(result.fromDate, '2016-01-01')
      assert.strictEqual(result.toDate, '2017-12-01')
    })
  })

  describe('2 years (quarters)', () => {
    it('(2016, 1, 1) - (2018, 1, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 1, 1),
        NormalDate(2018, 1, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 8)
      assert.strictEqual(result.fromDate, '2016-01-01')
      assert.strictEqual(result.toDate, '2018-01-01')

      assert.strictEqual(result.bars[0].showDate, '2016-01-01')
      assert.strictEqual(result.bars[0].startDate, '2016-01-01')
      assert.strictEqual(result.bars[0].endDate, '2016-04-01')

      assert.strictEqual(result.bars[1].showDate, '2016-04-01')
      assert.strictEqual(result.bars[1].startDate, '2016-04-01')
      assert.strictEqual(result.bars[1].endDate, '2016-07-01')

      assert.strictEqual(result.bars[2].showDate, '2016-07-01')
      assert.strictEqual(result.bars[2].startDate, '2016-07-01')
      assert.strictEqual(result.bars[2].endDate, '2016-10-01')
    })

    it('(2016, 2, 1) - (2018, 2, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2016, 2, 1),
        NormalDate(2018, 2, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 9)
      assert.strictEqual(result.fromDate, '2016-02-01')
      assert.strictEqual(result.toDate, '2018-02-01')

      assert.strictEqual(result.bars[0].showDate, '2016-01-01')
      assert.strictEqual(result.bars[0].startDate, '2016-01-01')
      assert.strictEqual(result.bars[0].endDate, '2016-04-01')

      assert.strictEqual(result.bars[1].showDate, '2016-04-01')
      assert.strictEqual(result.bars[1].startDate, '2016-04-01')
      assert.strictEqual(result.bars[1].endDate, '2016-07-01')

      //.....

      assert.strictEqual(result.bars[8].showDate, '2018-01-01')
      assert.strictEqual(result.bars[8].startDate, '2018-01-01')
      assert.strictEqual(result.bars[8].endDate, '2018-04-01')
    })
  })

  describe('5 years (quarters)', () => {
    it('(2013, 1, 1) - (2018, 1, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2013, 1, 1),
        NormalDate(2018, 1, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 20)
      assert.strictEqual(result.fromDate, '2013-01-01')
      assert.strictEqual(result.toDate, '2018-01-01')
    })

    it('(2013, 2, 1) - (2018, 2, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2013, 2, 1),
        NormalDate(2018, 2, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 21)
      assert.strictEqual(result.fromDate, '2013-02-01')
      assert.strictEqual(result.toDate, '2018-02-01')
    })

    it('(2012, 12, 1) - (2018, 1, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2012, 12, 1),
        NormalDate(2018, 1, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 21)
      assert.strictEqual(result.fromDate, '2012-12-01')
      assert.strictEqual(result.toDate, '2018-01-01')

      assert.strictEqual(result.bars[0].showDate, '2012-10-01')
      assert.strictEqual(result.bars[0].startDate, '2012-10-01')
      assert.strictEqual(result.bars[0].endDate, '2013-01-01')

      assert.strictEqual(result.bars[1].showDate, '2013-01-01')
      assert.strictEqual(result.bars[1].startDate, '2013-01-01')
      assert.strictEqual(result.bars[1].endDate, '2013-04-01')

      assert.strictEqual(result.bars[2].showDate, '2013-04-01')
      assert.strictEqual(result.bars[2].startDate, '2013-04-01')
      assert.strictEqual(result.bars[2].endDate, '2013-07-01')

      //.....

      assert.strictEqual(result.bars[20].showDate, '2017-10-01')
      assert.strictEqual(result.bars[20].startDate, '2017-10-01')
      assert.strictEqual(result.bars[20].endDate, '2018-01-01')
    })
  })

  describe('8 years (quarters)', () => {
    it('(2011, 1, 1) - (2019, 1, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2011, 1, 1),
        NormalDate(2019, 1, 1)
      )

      assert.strictEqual(result.barSize, 'quarter')
      assert.strictEqual(result.bars.length, 32)
      assert.strictEqual(result.fromDate, '2011-01-01')
      assert.strictEqual(result.toDate, '2019-01-01')
    })
  })

  describe('8 years + 1 month (years)', () => {
    it('(2011, 1, 1) - (2019, 2, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2011, 1, 1),
        NormalDate(2019, 2, 1)
      )

      assert.strictEqual(result.barSize, 'year')
      assert.strictEqual(result.bars.length, 9)
      assert.strictEqual(result.fromDate, '2011-01-01')
      assert.strictEqual(result.toDate, '2019-02-01')

      assert.strictEqual(result.bars[0].showDate, '2011-01-01')
      assert.strictEqual(result.bars[0].startDate, '2011-01-01')
      assert.strictEqual(result.bars[0].endDate, '2012-01-01')

      // ...

      assert.strictEqual(result.bars[8].showDate, '2019-01-01')
      assert.strictEqual(result.bars[8].startDate, '2019-01-01')
      assert.strictEqual(result.bars[8].endDate, '2020-01-01')
    })
  })

  describe('9 years (years)', () => {
    it('(2013, 1, 1) - (2022, 1, 1)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2013, 1, 1),
        NormalDate(2022, 1, 1)
      )

      assert.strictEqual(result.barSize, 'year')
      assert.strictEqual(result.bars.length, 9)
      assert.strictEqual(result.fromDate, '2013-01-01')
      assert.strictEqual(result.toDate, '2022-01-01')
    })

    it('+1 month', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2013, 1, 1),
        NormalDate(2022, 2, 1)
      )

      assert.strictEqual(result.barSize, 'year')
      assert.strictEqual(result.bars.length, 10)
      assert.strictEqual(result.fromDate, '2013-01-01')
      assert.strictEqual(result.toDate, '2022-02-01')
    })

    it('+1 month (2)', async () => {
      const result = await ledgerBarChart(
        null,
        null,
        NormalDate(2012, 12, 1),
        NormalDate(2022, 1, 1)
      )

      assert.strictEqual(result.barSize, 'year')
      assert.strictEqual(result.bars.length, 10)
      assert.strictEqual(result.fromDate, '2012-12-01')
      assert.strictEqual(result.toDate, '2022-01-01')

      assert.strictEqual(result.bars[0].showDate, '2012-01-01')
      assert.strictEqual(result.bars[0].startDate, '2012-01-01')
      assert.strictEqual(result.bars[0].endDate, '2013-01-01')

      // ...

      assert.strictEqual(result.bars[9].showDate, '2021-01-01')
      assert.strictEqual(result.bars[9].startDate, '2021-01-01')
      assert.strictEqual(result.bars[9].endDate, '2022-01-01')
    })
  })
})
