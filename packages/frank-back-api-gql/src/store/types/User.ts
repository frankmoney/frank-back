import Base from './Base'

type User = Base & {
  email: string
  lastName: string
  firstName: string
  avatar: any
}

export default User
