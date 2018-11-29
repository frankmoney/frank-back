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
  isEqual,
  subDays,
} from 'date-fns'
import R from 'ramda'
import Payment from 'store/types/Payment'
import Id from 'store/types/Id'
import createPaymentWhere from 'api/schema/helpers/createPaymentWhere'

const FORMAT_TEMPLATE = 'YYYY-MM-DD'

type Bar = {
  showDate: string
  startDate: string
  endDate: string
  revenue: number
  spending: number
}

type BarCharResult = {
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

    if (isEqual(endDate, startDate)) {
      endDate = addMonths(endDate, 1)
    }

    const bar = {
      showDate: format(_fromDate, FORMAT_TEMPLATE),
      startDate: format(startDate, FORMAT_TEMPLATE),
      endDate: format(subDays(endDate, 1), FORMAT_TEMPLATE),
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

export type Args = {
  accountId?: Id
  categoryId?: Id
  postedOnMin?: Date
  postedOnMax?: Date
  amountMin?: number
  amountMax?: number
  verified?: boolean
  pending?: boolean
  search?: string
  categoryType?: string
}

export default async (
  args: Args,
  scope: DefaultActionScope
): Promise<BarCharResult> => {
  const { postedOnMin, postedOnMax } = args

  let postedOnFrom = postedOnMin
  let postedOnTo = postedOnMax

  // весь данный код написан с условием что правая граница не включается в интервал выборки
  // к тому же минимальный интервал выборок - один целый месяц
  // поэтому что бы не ломать сложную логику проихсодит конвертация postedOnMax -> postedOnTo
  if (postedOnTo) {
    postedOnTo = addMonths(postedOnTo, 1)
    postedOnTo = startOfMonth(postedOnTo)
  }

  const payments = await listPayments(
    {
      where: createPaymentWhere(R.omit(['postedOnMax', 'postedOnMin'], args), {
        postedOn: {
          gte: postedOnFrom ? format(postedOnFrom, FORMAT_TEMPLATE) : undefined,
          lt: postedOnTo ? format(postedOnTo, FORMAT_TEMPLATE) : undefined,
        },
      }),
      orderBy: 'postedOn_DESC',
    },
    scope
  )

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
    total: Math.floor(total),
    maxRevenue: meta.maxRevenue,
    maxSpending: meta.maxSpending,
    maxTotal: meta.maxTotal,
    bars,
  }
}
