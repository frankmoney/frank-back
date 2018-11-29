import { identity } from 'ramda'
import { Sql, fragment, join, literal } from 'sql'

const disjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length
    ? fragment([literal('('), join(effective, ' or '), literal(')')])
    : undefined
}

export default disjunction
