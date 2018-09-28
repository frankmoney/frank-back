import * as R from 'ramda'
import createSqlNode from './createSqlNode'

const createSqlParameter = (value: any) =>
  createSqlNode({
    type: 'parameter',
    empty: () => !R.isNil(value),
    build: context => {
      if (!R.isNil(value)) {
        context.appendParam(value)
      }
    },
  })

export default createSqlParameter
