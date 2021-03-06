import Source from 'store/types/User'
import Target from 'api/types/User'
import Mapper from './Mapper'
import map from './map'

const mapUser: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('email', 'email')
  .for('lastName', 'lastName')
  .for('firstName', 'firstName')
  .for('avatar', 'avatar')
  .for('name', 'name')
  .build()

export default mapUser
