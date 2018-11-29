import { identity } from 'ramda'
import { Sql, fragment, join, literal } from 'sql'

const conjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length
    ? fragment([literal('('), join(effective, ' and '), literal(')')])
    : undefined
}

export default conjunction
