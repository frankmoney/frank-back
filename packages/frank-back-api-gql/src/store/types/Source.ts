import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Source = ExtendedBase & {
  data: Json
  name: string
  accountId: Id
  currencyCode: string
}

export default Source
