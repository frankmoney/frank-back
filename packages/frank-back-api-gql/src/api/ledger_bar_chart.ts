import {
  addMonths,
  startOfMonth,
  startOfWeek,
  addDays,
  addWeeks,
} from 'date-fns'

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

  //   return :day if 1.months.since(@from_date) >= @to_date
  //   return :week if 8.months.since(@from_date) >= @to_date
  //   return :month if 23.months.since(@from_date) >= @to_date
  //   return :quarter if 96.months.since(@from_date) >= @to_date
  // :year

  return 'year'
}

const generateBars = (
  barSize: string,
  fromDate: Date,
  toDate: Date
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
  // to_date = @from_date.beginning_of_quarter if self.bar_size == :quarter
  // to_date = @from_date.beginning_of_year if self.bar_size == :year

  while (_toDate < toDate) {
    _fromDate = _toDate

    if (barSize === 'day') {
      _toDate = addDays(_fromDate, 1)
    }

    if (barSize === 'week') {
      _toDate = addWeeks(_fromDate, 1)
    }

    // to_date = 1.month.since(from_date) if bas_size == :month
    // to_date = 3.month.since(from_date) if bar_size == :quarter
    // to_date = 1.year.since(from_date) if bar_size == :year
    //
    // start_select = from_date
    // start_select = @from_date if start_select < @from_date
    //   end_select = to_date
    // end_select = @to_date if end_select > @to_date
    //
    //   start_date = start_select.beginning_of_month
    // start_date = from_date if [:quarter, :year].include?(bar_size)
    //   end_date = to_date.beginning_of_month
    // end_date = 1.month.since(end_date) if end_date == start_date

    bars.push({
      showDate: '',
      startDate: '',
      endDate: '',
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
    maxIncome: meta.maxIncome,
    maxExpenses: meta.maxExpenses,
    maxSum: meta.maxSum,
    fromDate: '',
    toDate: '',
    totalSum: 0,
    bars,
  }
}
