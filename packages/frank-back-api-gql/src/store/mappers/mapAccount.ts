import { account } from '../names'
import Account from '../types/Account'
import Mapper from './Mapper'
import map from './map'

const mapAccount: Mapper<Account> = map<Account>()
  .from(account)
  .extend()
  .for('data', x => x.data)
  .for('name', x => x.name)
  .for('teamId', x => x.teamId)
  .for('currencyCode', x => x.currencyCode)
  .build()

export default mapAccount
