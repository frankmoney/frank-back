import Base from './Base'
import DateTime from './DateTime'
import Id from './Id'

export default interface TeamMemberInvite extends Base {
  id: Id
  token: string
  createdAt: DateTime
  creatorId: Id
  updatedAt: undefined | null | DateTime
  email: string
  note: undefined | null | string
  usedAt: undefined | null | DateTime
  teamId: Id
  roleId: undefined | null | Id
  userId: undefined | null | Id
}
