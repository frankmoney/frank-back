import { user } from '../names'
import User from '../types/User'
import Mapper from './Mapper'
import map from './map'

const mapUser: Mapper<User> = map<User>()
  .from(user)
  .extend()
  .for('email', x => x.email)
  .for('lastName', x => x.lastName)
  .for('firstName', x => x.firstName)
  .for('avatar', x => x.avatar)
  .for('name', x => x.name)
  .for('color', x => x.color)
  .build()

export default mapUser
