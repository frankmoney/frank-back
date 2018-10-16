import { peer } from '../names'
import Peer from '../types/Peer'
import Mapper from './Mapper'
import map from './map'

const mapPeer: Mapper<Peer> = map<Peer>()
  .from(peer)
  .extend()
  .for('name', x => x.name)
  .for('accountId', x => x.accountId)
  .build()

export default mapPeer
