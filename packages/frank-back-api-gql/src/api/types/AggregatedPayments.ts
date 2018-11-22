import Date from './Date'

type AggregatedPayments = {
  count?: number
  postedOnMin?: null | Date
  postedOnMax?: null | Date
  amountMin?: null | number
  amountMax?: null | number
}

export default AggregatedPayments
