import { SourceStatus } from '../enums'
import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Source = ExtendedBase & {
  data: Json
  name: string
  status: SourceStatus
  currencyCode: string
  accountId: Id
}

export default Source
