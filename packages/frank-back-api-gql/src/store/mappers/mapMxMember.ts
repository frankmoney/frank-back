import { mxMember } from '../names'
import MxMember from '../types/MxMember'
import Mapper from './Mapper'
import map from './map'

const mapMxMember: Mapper<MxMember> = map<MxMember>()
  .from(mxMember)
  .extend()
  .for('mxGuid', x => x.mxGuid)
  .for('institutionCode', x => x.institutionCode)
  .for('mxUserId', x => x.mxUserId)
  .build()

export default mapMxMember
