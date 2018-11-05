import ExtendedBase from './ExtendedBase'

type User = ExtendedBase & {
  email: string
  lastName: string
  firstName: string
  avatar: any
  name: string
}

export default User
