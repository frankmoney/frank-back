import * as R from 'ramda'
import SqlNode from './SqlNode'
import createSqlNode from './createSqlNode'

const createSqlFragment = (children: SqlNode[]) =>
  createSqlNode({
    type: 'fragment',
    empty: () => children.length === 0 || R.all(x => x.empty(), children),
    build: context => children.forEach(x => x.build(context)),
  })

export default createSqlFragment
