import { UserType } from './types'

export const getUserFullName = (user: UserType) => user.lastName
  ? `${user.firstName} ${user.lastName}`
  : user.firstName
