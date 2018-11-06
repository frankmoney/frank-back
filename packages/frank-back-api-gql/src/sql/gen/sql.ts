import { Sql, SqlFragment, fragment, isSql, literal, parameter } from '../ast'
import and from './and'
import raw from './raw'

const sql = (strings: TemplateStringsArray, ...args: any[]): SqlFragment => {
  const formatError = (msg: string) =>
    `Format error: ${msg}\r\nTemplate: ${strings.join('')}\r\nArgs: ${args}`

  if (strings.length - 1 !== args.length) {
    throw new Error(formatError('parameter count mismatch'))
  }

  const children: Sql[] = [literal(strings[0])]

  args.forEach((arg, index) => {
    if (arg === undefined) {
      // throw new Error(
      //   formatError(
      //     'sql can not contain undefined parameters (#' +
      //       `${index}, near '${strings[index]}' and '${strings[index + 1]}')`
      //   )
      // )
    } else {
      if (isSql(arg)) {
        children.push(arg)
      } else if (Array.isArray(arg)) {
        if (arg.length === 0) {
          throw new Error(formatError('list parameters can not be empty'))
        }

        for (const item of arg) {
          if (isSql(item)) {
            children.push(item)
          } else {
            children.push(parameter(item))
          }
          children.push(literal(', '))
        }
        children.pop()
      } else {
        children.push(parameter(arg))
      }
    }

    children.push(literal(strings[index + 1]))
  })

  return fragment(children)
}

sql.unparameterized = (
  strings: TemplateStringsArray,
  ...args: any[]
): SqlFragment => {
  const formatError = (msg: string) =>
    `Format error: ${msg}\r\nTemplate: ${strings.join('')}\r\nArgs: ${args}`

  if (strings.length - 1 !== args.length) {
    throw new Error(formatError('parameter count mismatch'))
  }

  const children: Sql[] = [literal(strings[0])]

  args.forEach((arg, index) => {
    if (isSql(arg)) {
      children.push(arg)
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (isSql(item)) {
          children.push(item)
        } else {
          children.push(raw(item))
        }
      }
    } else {
      children.push(raw(arg))
    }
    children.push(literal(strings[index + 1]))
  })

  return fragment(children)
}

sql.and = and

export default sql
