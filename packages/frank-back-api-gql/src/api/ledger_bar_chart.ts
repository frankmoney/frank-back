//  дни 1 месяц                  30 баров
//  недели 2-8 месяцев     8-32 недели
//  месяцы 9-23 месяца    9-23 месяца
//  кварталы 2-8 лет          8-32 квартала
//  годы 9+ лет  ....             9+ лет

import DefaultActionScope from 'api/dal/DefaultActionScope'
import listPayments from 'api/dal/Payment/listPayments'
import LedgerBarChartBarSize from 'api/types/LedgerBarChartBarSize'
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import R from 'ramda'
import Account from 'store/types/Account'
import Payment from 'store/types/Payment'

const FORMAT_TEMPLATE = 'YYYY-MM-DD'

type Bar = {
  showDate: string
  startDate: string
  endDate: string
  revenue: number
  spending: number
}

type BarCharResult = {
  fromDate: string
  toDate: string
  barSize: LedgerBarChartBarSize
  total: number
  maxTotal: number
  maxRevenue: number
  maxSpending: number
  bars: Bar[]
}

const calculateBarSize = (
  fromDate: Date,
  toDate: Date
): LedgerBarChartBarSize => {
  if (addMonths(fromDate, 1) >= toDate) {
    return LedgerBarChartBarSize.day
  }

  if (addMonths(fromDate, 8) >= toDate) {
    return LedgerBarChartBarSize.week
  }

  if (addMonths(fromDate, 23) >= toDate) {
    return LedgerBarChartBarSize.month
  }

  if (addMonths(fromDate, 96) >= toDate) {
    return LedgerBarChartBarSize.quarter
  }

  return LedgerBarChartBarSize.year
}

const generateBars = (
  barSize: string,
  fromDate: Date,
  toDate: Date,
  payments: Payment[]
): {
  meta: {
    maxTotal: number
    maxRevenue: number
    maxSpending: number
  }
  bars: Bar[]
} => {
  const bars: Bar[] = []
  const meta = {
    maxTotal: 0,
    maxRevenue: 0,
    maxSpending: 0,
  }

  let _fromDate: Date | null = null
  let _toDate = fromDate

  if (barSize === 'week') {
    _toDate = startOfWeek(fromDate)
  }

  if (barSize === 'quarter') {
    _toDate = startOfQuarter(fromDate)
  }

  if (barSize === 'year') {
    _toDate = startOfYear(fromDate)
  }

  while (_toDate < toDate) {
    _fromDate = _toDate

    _toDate = addDays(_fromDate, 1)

    if (barSize === 'week') {
      _toDate = addWeeks(_fromDate, 1)
    }

    if (barSize === 'month') {
      _toDate = addMonths(_fromDate, 1)
    }

    if (barSize === 'quarter') {
      _toDate = addMonths(_fromDate, 3)
    }

    if (barSize === 'year') {
      _toDate = addYears(_fromDate, 1)
    }

    let startSelect = _fromDate

    if (startSelect < fromDate) {
      startSelect = fromDate
    }

    let endSelect = _toDate
    if (endSelect > toDate) {
      endSelect = toDate
    }

    let startDate = startOfMonth(startSelect)

    if (barSize === 'quarter' || barSize === 'year') {
      startDate = _fromDate
    }

    let endDate = startOfMonth(_toDate)

    if (
      format(endDate, FORMAT_TEMPLATE) === format(startDate, FORMAT_TEMPLATE)
    ) {
      endDate = addMonths(endDate, 1)
    }

    const bar = {
      showDate: format(_fromDate, FORMAT_TEMPLATE),
      startDate: format(startDate, FORMAT_TEMPLATE),
      endDate: format(endDate, FORMAT_TEMPLATE),
      revenue: 0,
      spending: 0,
    }

    const paymentsForCurrentBar = R.filter(p => {
      const postedOn = new Date(p.postedOn)
      return postedOn >= startSelect && postedOn < endSelect
    }, payments)

    R.forEach(p => {
      if (p.amount > 0) {
        bar.revenue += p.amount
      } else {
        bar.spending += Math.abs(p.amount)
      }
    }, paymentsForCurrentBar)

    bar.revenue = Math.floor(bar.revenue)
    bar.spending = Math.floor(bar.spending)

    meta.maxTotal = Math.max(meta.maxTotal, bar.revenue + bar.spending)
    meta.maxRevenue = Math.max(meta.maxRevenue, bar.revenue)
    meta.maxSpending = Math.max(meta.maxSpending, bar.spending)

    bars.push(bar)
  }

  return {
    meta,
    bars,
  }
}

export default async (
  scope: DefaultActionScope | null,
  account: Account | null,
  postedOnFrom?: Date,
  postedOnTo?: Date
): Promise<BarCharResult> => {
  let payments: Payment[] = []

  if (scope && account) {
    payments = await listPayments(
      {
        where: {
          accountId: {
            eq: account.id,
          },
        },
        orderBy: 'postedOn_DESC',
      },
      scope
    )
  }

  if (R.isNil(postedOnTo)) {
    postedOnTo = addMonths(new Date(), 1)
  }

  if (R.isNil(postedOnFrom)) {
    const lastPayment: Payment = payments[payments.length - 1]

    if (lastPayment) {
      postedOnFrom = new Date(lastPayment.postedOn)
    } else {
      postedOnFrom = postedOnTo
    }
  }

  postedOnFrom = startOfMonth(postedOnFrom)
  postedOnTo = startOfMonth(postedOnTo)

  const barSize = calculateBarSize(postedOnFrom, postedOnTo)

  const total = R.sum(R.map(p => p.amount, payments))

  const { meta, bars } = generateBars(
    barSize,
    postedOnFrom,
    postedOnTo,
    payments
  )

  return {
    barSize,
    fromDate: format(postedOnFrom, FORMAT_TEMPLATE),
    toDate: format(postedOnTo, FORMAT_TEMPLATE),
    total: Math.floor(total),
    maxRevenue: meta.maxRevenue,
    maxSpending: meta.maxSpending,
    maxTotal: meta.maxTotal,
    bars,
  }
}
