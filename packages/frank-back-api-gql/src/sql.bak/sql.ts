import SqlNode from './SqlNode'
import createSqlFragment from './createSqlFragment'
import createSqlLiteral from './createSqlLiteral'
import createSqlParameter from './createSqlParameter'
import getSqlNode from './getSqlNode'

const sql = (strings: TemplateStringsArray, ...args: any[]): SqlNode => {
  if (strings.length - 1 !== args.length) {
    throw new Error('Parameter count mismatch')
  }

  const children: SqlNode[] = [createSqlLiteral(strings[0])]

  args.forEach((arg, index) => {
    if (arg === undefined) {
      throw new Error(
        `Format error: sql can not contain undefined parameters.\r\nTemplate: ${strings.join(
          ''
        )}Args: ${args}`
      )
    }

    const array = Array.isArray(arg) ? arg : [arg]

    for (const item of array) {
      const sqlNode = getSqlNode(item)

      if (sqlNode) {
        children.push(sqlNode)
      } else {
        const sqlParameter = createSqlParameter(item)
        children.push(sqlParameter)
      }
    }

    children.push(createSqlLiteral(strings[index + 1]))
  })

  return createSqlFragment(children)
}

export default sql
