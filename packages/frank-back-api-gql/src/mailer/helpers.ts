import Payment from 'store/types/Payment'
import { format, isSameYear, isSameMonth } from 'date-fns'

const MONTH_YEAR_TEMPLATE = 'MMM, YYYY'

export const paymentsDatesDescription = (sortedPayments: Payment[]) => {
  if (sortedPayments.length === 0) {
    return ''
  }

  if (sortedPayments.length === 1) {
    return format(sortedPayments[0].postedOn, MONTH_YEAR_TEMPLATE)
  }

  const firstDate = sortedPayments[0].postedOn
  const lastDate = sortedPayments[sortedPayments.length - 1].postedOn

  if (!isSameYear(firstDate, lastDate)) {
    return `${format(firstDate, MONTH_YEAR_TEMPLATE)} - ${format(
      lastDate,
      MONTH_YEAR_TEMPLATE
    )}`
  }

  if (!isSameMonth(firstDate, lastDate)) {
    return `${format(firstDate, 'MMM')} - ${format(
      lastDate,
      MONTH_YEAR_TEMPLATE
    )}`
  }

  return format(firstDate, MONTH_YEAR_TEMPLATE)
}
