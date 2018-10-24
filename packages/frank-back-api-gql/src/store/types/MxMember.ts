import ExtendedBase from './ExtendedBase'
import Id from './Id'
import MxUser from './MxUser'

type MxMember = ExtendedBase & {
  mxGuid: string
  institutionCode: string
  mxUserId: Id
  mxUser: MxUser
}

export default MxMember
