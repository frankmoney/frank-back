import Payment from 'store/types/Payment'
import { format, isSameYear } from 'date-fns'

export const paymentsDatesDescription = (sortedPayments: Payment[]) => {

  if (sortedPayments.length === 0) {
    return ''
  }

  if (sortedPayments.length === 1) {
    return format(sortedPayments[0].postedOn, 'MMM, YYYY')
  }

  const firstDate = sortedPayments[0].postedOn
  const lastDate = sortedPayments[sortedPayments.length - 1].postedOn

  if (isSameYear(firstDate, lastDate)) {

    return `${format(firstDate, 'MMM')} - ${format(lastDate, 'MMM, YYYY')}`
  }

  return `${format(firstDate, 'MMM, YYYY')} - ${format(lastDate, 'MMM, YYYY')}`
}
