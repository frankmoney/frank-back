import { user } from '../names'
import User from '../types/User'
import Mapper from './Mapper'
import map from './map'

const mapUser: Mapper<User> = map<User>()
  .from(user)
  .for('id', x => x.id)
  .for('pid', x => x.pid)
  .for('lastName', x => x.lastName)
  .build()

export default mapUser
