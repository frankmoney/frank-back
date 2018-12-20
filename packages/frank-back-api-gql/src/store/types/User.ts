import ExtendedBase from './ExtendedBase'
import { UserType } from '../enums'

type User = ExtendedBase & {
  typeId: UserType
  name: string
  email: string
  lastName: string
  firstName: string
  avatar: any
  color: number
  passwordHash: string
  phone: string
}

export default User
