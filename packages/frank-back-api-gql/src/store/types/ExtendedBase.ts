import Base from './Base'

type ExtendedBase = Base & {
  id: number
  pid: number
  createdAt: string
  creatorId: string
  updatedAt: string
  updaterId: number
}

export default ExtendedBase
