import KEY from './KEY'

type SqlParameter<TValue = any> = {
  readonly [KEY]: {
    readonly type: 'parameter'
    readonly value: TValue
  }
}

export default SqlParameter
