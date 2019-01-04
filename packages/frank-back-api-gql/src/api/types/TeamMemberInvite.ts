import DateTime from './DateTime'
import Id from './Id'

export default interface TeamMemberInvite {
  id: Id
  token: string
  createdAt: DateTime
  updatedAt: undefined | null | DateTime
  email: string
  note: undefined | null | string
  usedAt: undefined | null | DateTime
}
