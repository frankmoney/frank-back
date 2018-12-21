import Id from './Id'
import Json from './Json'

type Account = {
  pid: Id
  data: Json
  name: string
  description: string
  public: boolean
  currencyCode: string
}

export default Account
