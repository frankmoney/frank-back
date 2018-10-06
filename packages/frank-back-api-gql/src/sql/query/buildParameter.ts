import { KEY, SqlParameter } from '../ast'
import BuildContext from './BuildContext'
import isEmptyParameter from './isEmptyParameter'

const buildParameter = (sql: SqlParameter, context: BuildContext) => {
  if (!isEmptyParameter(sql)) {
    const index = context.appendParameter(sql[KEY].value)
    context.appendText(`$${index}`)
  }
}

export default buildParameter
