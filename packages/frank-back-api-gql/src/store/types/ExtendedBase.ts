import Base from './Base'
import DateTime from './DateTime'
import Id from './Id'
import Pid from './Pid'

type ExtendedBase = Base & {
  id: Id
  pid: Pid
  createdAt: DateTime
  creatorId: Id
  updatedAt: DateTime
  updaterId: Id
}

export default ExtendedBase
