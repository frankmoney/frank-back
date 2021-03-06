import KEY from './KEY'
import SqlParameter from './SqlParameter'

const parameter = <TValue = any>(value: TValue): SqlParameter<TValue> => ({
  [KEY]: {
    type: 'parameter',
    value,
  },
  toString: () => `${value}`,
})

export default parameter
