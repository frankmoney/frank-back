import Source from 'store/types/Category'
import Target from 'api/types/Category'
import Mapper from './Mapper'
import map from './map'

const mapCategory: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('name', 'name')
  .for('color', 'color')
  .for('type', 'type')
  .build()

export default mapCategory
