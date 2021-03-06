import { payment } from '../names'
import Payment from '../types/Payment'
import Mapper from './Mapper'
import map from './map'

const mapPayment: Mapper<Payment> = map<Payment>()
  .from(payment)
  .extend()
  .for('data', x => x.data)
  .for('postedOn', x => x.postedOn)
  .for('amount', x => x.amount)
  .for('peerName', x => x.peerName)
  .for('description', x => x.description)
  .for('verified', x => x.verified)
  .for('pending', x => x.pending)
  .for('sourceId', x => x.sourceId)
  .for('accountId', x => x.accountId)
  .for('peerId', x => x.peerId)
  .for('categoryId', x => x.categoryId)
  .for('descriptionUpdaterId', x => x.descriptionUpdaterId)
  .for('peerUpdaterId', x => x.peerUpdaterId)
  .for('categoryUpdaterId', x => x.categoryUpdaterId)
  .build()

export default mapPayment
