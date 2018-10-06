import { KEY, SqlLiteral } from '../ast'
import BuildContext from './BuildContext'
import isEmptyLiteral from './isEmptyLiteral'

const buildLiteral = (sql: SqlLiteral, context: BuildContext) => {
  if (!isEmptyLiteral(sql)) {
    context.appendText(sql[KEY].text)
  }
}

export default buildLiteral
