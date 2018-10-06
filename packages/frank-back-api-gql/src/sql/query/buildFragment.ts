import { KEY, SqlFragment, SqlLiteral, SqlParameter } from '../ast'
import BuildContext from './BuildContext'
import buildLiteral from './buildLiteral'
import buildParameter from './buildParameter'

const buildFragment = (sql: SqlFragment, context: BuildContext) => {
  for (const child of sql[KEY].children) {
    switch (child[KEY].type) {
      case 'literal':
        buildLiteral(<SqlLiteral>child, context)
        break
      case 'parameter':
        buildParameter(<SqlParameter>child, context)
        break
      case 'fragment':
        buildFragment(<SqlFragment>child, context)
        break
    }
  }
}

export default buildFragment
