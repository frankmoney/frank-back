import AccountAccess from './AccountAccess'
import Id from './Id'
import Json from './Json'

type Account = {
  pid: Id
  data: Json
  name: string
  currencyCode: string
  access: AccountAccess
}

export default Account
