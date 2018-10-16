import Target from 'api/types/Category'
import Source from 'store/types/Category'
import Mapper from './Mapper'
import map from './map'

const mapCategory: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('name', 'name')
  .for('color', 'color')
  .build()

export default mapCategory
