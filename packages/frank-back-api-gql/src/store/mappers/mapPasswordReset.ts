import { passwordReset } from '../names'
import PasswordReset from '../types/PasswordReset'
import Mapper from './Mapper'
import map from './map'

const mapPasswordReset: Mapper<PasswordReset> = map<PasswordReset>()
  .from(passwordReset)
  .for('id', x => x.id)
  .for('token', x => x.token)
  .for('createdAt', x => x.createdAt)
  .for('updatedAt', x => x.updatedAt)
  .for('usedAt', x => x.userId)
  .for('userId', x => x.userId)
  .build()

export default mapPasswordReset
