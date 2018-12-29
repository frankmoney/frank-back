import { format, isSameDay, isSameYear } from 'date-fns'
import { UserType } from './types'

const MONTH_DATE_FORMAT = 'MMM'
const MONTH_YEAR_DATE_FORMAT = 'MMM, YYYY'

export const getUserFullName = (user: UserType) => user.lastName
  ? `${user.firstName} ${user.lastName}`
  : user.firstName

export const formatPaymentDates = (dates: undefined | null | [null | string, null | string]) => {
  if (!dates || !dates[0]) {
    return ''
  }

  if (!dates[1] || isSameDay(dates[0]!, dates[1]!)) {
    return format(dates[0]!, MONTH_YEAR_DATE_FORMAT)
  }

  const [start, end] =
    isSameYear(dates[0]!, dates[1]!)
      ? dates.map(x => format(x!, MONTH_DATE_FORMAT))
      : dates.map(x => format(x!, MONTH_YEAR_DATE_FORMAT))

  return `${start} - ${end}`
}
