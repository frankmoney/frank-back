import SqlFragment from '../ast/SqlFragment'
import fragment from '../ast/fragment'
import literal from '../ast/literal'

const and = (body?: SqlFragment) =>
  body === undefined ? fragment([]) : fragment([literal('and '), body])

export default and
