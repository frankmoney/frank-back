import { Sql, fragment, literal } from '../ast'

const where = (
  ...predicates: (undefined | Sql | (undefined | Sql)[])[]
): undefined | Sql => {
  const flat: Sql[] = []

  const add = (predicate: Sql) =>
    flat.push(
      fragment([
        literal(flat.length ? ' and (' : ' where ('),
        predicate,
        literal(') '),
      ])
    )

  for (const x of predicates) {
    if (x !== undefined) {
      if (Array.isArray(x)) {
        for (const y of x) {
          if (y !== undefined) {
            add(y)
          }
        }
      } else {
        add(x)
      }
    }
  }

  return flat.length === 0 ? undefined : fragment(flat)
}

export default where
