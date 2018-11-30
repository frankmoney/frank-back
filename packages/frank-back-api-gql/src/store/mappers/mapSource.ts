import { source } from '../names'
import Source from '../types/Source'
import Mapper from './Mapper'
import map from './map'

const mapAccount: Mapper<Source> = map<Source>()
  .from(source)
  .extend()
  .for('data', x => x.data)
  .for('name', x => x.name)
  .for('accountId', x => x.accountId)
  .for('currencyCode', x => x.currencyCode)
  .build()

export default mapAccount
