import { account } from '../names'
import Account from '../types/Account'
import Mapper from './Mapper'
import map from './map'

const mapAccount: Mapper<Account> = map<Account>()
  .from(account)
  .extend()
  .for('accessRole', 'accessRole')
  .for('data', x => x.data)
  .for('name', x => x.name)
  .for('description', x => x.description)
  .for('public', x => x.public)
  .for('teamId', x => x.teamId)
  .for('currencyCode', x => x.currencyCode)
  .for('demo', x => x.demo)
  .build()

export default mapAccount
