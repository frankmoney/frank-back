import { AccountAccessRole } from '../enums'
import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Account = ExtendedBase & {
  accessRole: AccountAccessRole
  data: Json
  name: string
  description: string
  public: boolean
  teamId: Id
  currencyCode: string
  demo: boolean
}

export default Account
