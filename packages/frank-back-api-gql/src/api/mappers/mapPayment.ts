import Source from 'store/types/Payment'
import Target from 'api/types/Payment'
import Mapper from './Mapper'
import map from './map'

const mapPayment: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('data', 'data')
  .for('postedOn', 'postedOn')
  .for('amount', 'amount')
  .for('peerName', 'peerName')
  .for('description', 'description')
  .for('verified', 'verified')
  .for('published', 'published')
  .build()

export default mapPayment
