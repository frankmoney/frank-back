import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Account = ExtendedBase & {
  data: Json
  name: string
  teamId: Id
}

export default Account
