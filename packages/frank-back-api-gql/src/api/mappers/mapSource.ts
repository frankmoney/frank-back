import Source from 'store/types/Source'
import Target from 'api/types/Source'
import Mapper from './Mapper'
import map from './map'

const mapSource: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('data', 'data')
  .for('name', 'name')
  .build()

export default mapSource
