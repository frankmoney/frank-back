import * as R from 'ramda'
import SqlNode from './SqlNode'
import createSqlFragment from './createSqlFragment'
import createSqlLiteral from './createSqlLiteral'
import createSqlParameter from './createSqlParameter'
import isSqlNode from './isSqlNode'

const sql = (strings: TemplateStringsArray, ...args: any[]): SqlNode => {
  if (strings.length - 1 !== args.length) {
    throw new Error('Parameter count mismatch')
  }

  const children: SqlNode[] = [createSqlLiteral(strings[0])]

  args.forEach((arg, index) => {
    if (isSqlNode(arg)) {
      children.push(arg)
    } else if (R.last(strings[index]) === '$') {
      children.push(createSqlParameter(arg))
    } else {
      children.push(createSqlLiteral(arg))
    }

    children.push(createSqlLiteral(strings[index + 1]))
  })

  return createSqlFragment(children)
}

export default sql
