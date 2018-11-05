import { Sql, fragment, literal } from '../ast'

const and = (
  ...predicates: (undefined | Sql | (undefined | Sql)[])[]
): undefined | Sql => {
  const flat: Sql[] = []

  const add = (predicate: Sql) =>
    fragment([literal(' and ('), predicate, literal(') ')])

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

export default and
