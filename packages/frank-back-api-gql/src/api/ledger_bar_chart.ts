import {
  addMonths,
  startOfMonth,
  startOfWeek,
  startOfQuarter,
  startOfYear,
  addDays,
  addWeeks,
  addYears,
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
): {
  meta: {
    maxIncome: number
    maxExpenses: number
    maxSum: number
  }
  bars: Bar[]
} => {
  const bars: Bar[] = []

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

    bars.push({
      showDate: format(_fromDate, FORMAT_TEMPLATE),
      startDate: format(startDate, FORMAT_TEMPLATE),
      endDate: format(endDate, FORMAT_TEMPLATE),
      income: 0,
      expenses: 0,
    })
  }

  return {
    meta: {
      maxIncome: 0,
      maxExpenses: 0,
      maxSum: 0,
    },
    bars,
  }
}

export default (account: any, fromDate: Date, toDate: Date): BarCharResult => {
  fromDate = startOfMonth(fromDate)
  toDate = startOfMonth(toDate)

  const barSize = calculateBarSize(fromDate, toDate)

  const { meta, bars } = generateBars(barSize, fromDate, toDate)

  return {
    barSize,
    fromDate: format(fromDate, FORMAT_TEMPLATE),
    toDate: format(toDate, FORMAT_TEMPLATE),
    maxIncome: meta.maxIncome,
    maxExpenses: meta.maxExpenses,
    maxSum: meta.maxSum,
    totalSum: 0,
    bars,
  }
}
