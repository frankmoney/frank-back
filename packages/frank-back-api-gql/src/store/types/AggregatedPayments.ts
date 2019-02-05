import Base from './Base'
import Date from './Date'

type AggregatedPayments = Base & {
  count?: number
  postedOnMin?: null | Date
  postedOnMax?: null | Date
  amountMin?: null | number
  amountMax?: null | number
  totalSum?: null | number
}

export default AggregatedPayments
