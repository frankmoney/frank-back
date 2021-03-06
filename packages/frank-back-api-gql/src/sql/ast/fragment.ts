import KEY from './KEY'
import Sql from './Sql'
import SqlFragment from './SqlFragment'

const fragment = (children: Sql[]): SqlFragment => ({
  [KEY]: {
    type: 'fragment',
    children,
  },
  toString: () => children.map(x => `${x}`).join(''),
})

export default fragment
