import { Sql } from '../ast'
import join from './join'
import sql from './sql'

const orderBy = (
  ...clauses: (undefined | Sql | (undefined | Sql)[])[]
): undefined | Sql => {
  const flat: Sql[] = []

  for (const clause of clauses) {
    if (clause !== undefined) {
      if (Array.isArray(clause)) {
        flat.push(...(<Sql[]>clause.filter(x => x)))
      } else {
        flat.push(clause)
      }
    }
  }

  return flat.length ? sql`order by ${join(flat, ', ')}` : undefined
}

export default orderBy
