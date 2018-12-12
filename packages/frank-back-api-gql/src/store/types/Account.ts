import { AccountAccessRole } from '../enums'
import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Account = ExtendedBase & {
  accessRole: AccountAccessRole
  data: Json
  name: string
  teamId: Id
  currencyCode: string
  public: boolean
}

export default Account
