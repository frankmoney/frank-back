import { fragment, isSql, literal, Sql, SqlFragment } from '../ast'

const join = (list: any[], glue?: string | Sql): SqlFragment => {
  const children: Sql[] = []

  if (list.length > 0) {
    for (const item of list) {
      if (item !== undefined && item !== null) {
        if (isSql(item)) {
          children.push(item)
        } else {
          children.push(literal(item))
        }

        if (glue) {
          if (isSql(glue)) {
            children.push(glue)
          } else {
            children.push(literal(glue))
          }
        }
      }
    }

    children.pop()
  }

  return fragment(children)
}

export default join
