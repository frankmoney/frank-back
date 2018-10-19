import Target from 'api/types/Account'
import Source from 'store/types/Account'
import Mapper from './Mapper'
import map from './map'

const mapAccount: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('data', 'data')
  .for('name', 'name')
  .build()

export default mapAccount