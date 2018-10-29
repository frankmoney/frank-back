import { parameter } from '../ast'

const nullIfEmpty = (value: undefined | null | string) =>
  parameter(
    value === undefined || value === null || value === '' ? null : value
  )

export default nullIfEmpty
