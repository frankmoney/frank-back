import Source from 'store/types/Peer'
import Target from 'api/types/Peer'
import Mapper from './Mapper'
import map from './map'

const mapPeer: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('name', 'name')
  .build()

export default mapPeer
