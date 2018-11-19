//  дни 1 месяц                  30 баров
//  недели 2-8 месяцев     8-32 недели
//  месяцы 9-23 месяца    9-23 месяца
//  кварталы 2-8 лет          8-32 квартала
//  годы 9+ лет  ....             9+ лет

import Account from 'store/types/Account'
import Payment from 'store/types/Payment'
import DefaultActionScope from 'api/dal/DefaultActionScope'
import listPaymentsByAccountId from 'api/dal/Payment/listPaymentsByAccountId'
import R from 'ramda'
import {
  addMonths,
  startOfMonth,
  startOfWeek,
  startOfQuarter,
  startOfYear,
  addDays,
  addWeeks,
  addYears,
  subDays,
  format,
} from 'date-fns'

const FORMAT_TEMPLATE = 'YYYY-MM-DD'

type Bar = {
  showDate: string
  startDate: string
  endDate: string
  income: number
  expenses: number
}

type BarCharResult = {
  barSize: string
  maxIncome: number
  maxExpenses: number
  maxSum: number
  fromDate: string
  toDate: string
  totalSum: number
  bars: Bar[]
}

const calculateBarSize = (fromDate: Date, toDate: Date): string => {
  if (addMonths(fromDate, 1) >= toDate) {
    return 'day'
  }

  if (addMonths(fromDate, 8) >= toDate) {
    return 'week'
  }

  if (addMonths(fromDate, 23) >= toDate) {
    return 'month'
  }

  if (addMonths(fromDate, 96) >= toDate) {

    return 'quarter'
  }

  return 'year'
}

const generateBars = (
  barSize: string,
  fromDate: Date,
  toDate: Date,
  payments: Payment[],
): {
  meta: {
    maxIncome: number
    maxExpenses: number
    maxSum: number
  }
  bars: Bar[]
} => {

  const bars: Bar[] = []
  const meta = {
    maxIncome: 0,
    maxExpenses: 0,
    maxSum: 0,
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

    if (format(endDate, FORMAT_TEMPLATE) === format(startDate, FORMAT_TEMPLATE)) {
      endDate = addMonths(endDate, 1)
    }

    const bar = {
      showDate: format(_fromDate, FORMAT_TEMPLATE),
      startDate: format(startDate, FORMAT_TEMPLATE),
      endDate: format(endDate, FORMAT_TEMPLATE),
      income: 0,
      expenses: 0,
    }

    const paymentsForCurrentBar = R.filter(p => {
      const postedOn = new Date(p.postedOn)
      return postedOn >= startSelect && postedOn < endSelect
    }, payments)

    R.forEach(p => {

      if (p.amount > 0) {
        bar.income += p.amount
      } else {
        bar.expenses += Math.abs(p.amount)
      }

    }, paymentsForCurrentBar)

    bar.income = Math.floor(bar.income)
    bar.expenses = Math.floor(bar.expenses)

    meta.maxIncome = Math.max(meta.maxIncome, bar.income)
    meta.maxExpenses = Math.max(meta.maxExpenses, bar.expenses)
    meta.maxSum = Math.max(meta.maxSum, (bar.income + bar.expenses))

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
  fromDate: Date | undefined,
  toDate: Date | undefined,
): Promise<BarCharResult> => {

  let payments: Payment[] = []

  if (scope && account) {

    const postedOnMin = fromDate ? format(fromDate, FORMAT_TEMPLATE) : undefined
    const postedOnMax = toDate ? format(subDays(toDate, 1), FORMAT_TEMPLATE) : undefined

    payments = await listPaymentsByAccountId({
      accountId: account.id,
      orderBy: 'postedOn_DESC',
      postedOnMin,
      postedOnMax,
    }, scope)
  }


  if (R.isNil(toDate)) {
    toDate = addMonths(new Date, 1)
  }

  if (R.isNil(fromDate)) {
    const lastPayment: Payment = payments[payments.length - 1]

    if (lastPayment) {
      fromDate = new Date(lastPayment.postedOn)
    } else {
      fromDate = toDate
    }
  }

  fromDate = startOfMonth(fromDate)
  toDate = startOfMonth(toDate)

  const barSize = calculateBarSize(fromDate, toDate)

  const totalSum = R.sum(R.map(p => p.amount, payments))

  const { meta, bars } = generateBars(barSize, fromDate, toDate, payments)

  return {
    barSize,
    fromDate: format(fromDate, FORMAT_TEMPLATE),
    toDate: format(toDate, FORMAT_TEMPLATE),
    maxIncome: meta.maxIncome,
    maxExpenses: meta.maxExpenses,
    maxSum: meta.maxSum,
    totalSum: Math.floor(totalSum),
    bars,
  }
}
