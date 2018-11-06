import ExtendedBase from './ExtendedBase'

type User = ExtendedBase & {
  email: string
  lastName: string
  firstName: string
  avatar: any
  name: string
  color: number
}

export default User
