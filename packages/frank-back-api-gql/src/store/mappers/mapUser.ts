import { user } from '../names'
import User from '../types/User'
import Mapper from './Mapper'
import map from './map'

const mapUser: Mapper<User> = map<User>()
  .from(user)
  .extend()
  .for('typeId', x => x.typeId)
  .for('name', x => x.name)
  .for('email', x => x.email)
  .for('lastName', x => x.lastName)
  .for('firstName', x => x.firstName)
  .for('avatar', x => x.avatar)
  .for('color', x => x.color)
  .for('passwordHash', x => x.passwordHash)
  .for('phone', x => x.phone)
  .build()

export default mapUser
