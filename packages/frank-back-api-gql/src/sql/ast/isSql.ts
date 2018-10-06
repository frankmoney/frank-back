import KEY from './KEY'
import Sql from './Sql'

const isSql = (obj: any): obj is Sql => obj && obj[KEY]

export default isSql
