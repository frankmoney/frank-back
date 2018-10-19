import Id from './Id'
import Json from './Json'

type User = {
  pid: Id
  email: string
  lastName?: string
  firstName: string
  avatar?: Json
}

export default User