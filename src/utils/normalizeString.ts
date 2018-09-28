import { isNil } from 'ramda'

const normalizeString = (str?: string | null) =>
  isNil(str) ? undefined : str.toUpperCase()

export default normalizeString
