import ExtendedBase from './ExtendedBase'

type User = ExtendedBase & {
  email: string
  lastName: string
  firstName: string
  avatar: any
  color: number
}

export default User
