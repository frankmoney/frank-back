import SqlFragment from './SqlFragment'
import SqlLiteral from './SqlLiteral'
import SqlParameter from './SqlParameter'

type Sql = SqlFragment | SqlLiteral | SqlParameter

export default Sql
