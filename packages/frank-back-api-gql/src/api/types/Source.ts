import Id from './Id'
import Json from './Json'
import SourceStatus from './SourceStatus'

type Source = {
  pid: Id
  data: Json
  name: string
  status: SourceStatus
  currencyCode: string
}

export default Source
