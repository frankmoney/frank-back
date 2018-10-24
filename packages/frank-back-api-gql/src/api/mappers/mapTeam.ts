import Source from 'store/types/Team'
import Target from 'api/types/Team'
import Mapper from './Mapper'
import map from './map'

const mapTeam: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('name', 'name')
  .build()

export default mapTeam
