import { mxUser } from '../names'
import MxUser from '../types/MxUser'
import Mapper from './Mapper'
import map from './map'

const mapMxUser: Mapper<MxUser> = map<MxUser>()
  .from(mxUser)
  .extend()
  .for('mxGuid', x => x.mxGuid)
  .build()

export default mapMxUser
