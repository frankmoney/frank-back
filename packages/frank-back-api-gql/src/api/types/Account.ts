import Id from './Id'
import Json from './Json'

type Account = {
  pid: Id
  data: Json
  name: string
  currencyCode: string
  public: boolean
}

export default Account
