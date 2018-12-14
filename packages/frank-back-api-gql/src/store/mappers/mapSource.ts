import { source } from '../names'
import Source from '../types/Source'
import Mapper from './Mapper'
import map from './map'

const mapSource: Mapper<Source> = map<Source>()
  .from(source)
  .extend()
  .for('data', x => x.data)
  .for('name', x => x.name)
  .for('currencyCode', x => x.currencyCode)
  .for('accountId', x => x.accountId)
  .build()

export default mapSource
