import DateTime from './DateTime'
import Id from './Id'

type PasswordReset = {
  id: Id
  token: string
  createdAt: DateTime
  updatedAt: undefined | null | DateTime
  usedAt: undefined | null | DateTime
  userId: Id
}

export default PasswordReset
