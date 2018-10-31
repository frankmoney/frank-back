import KEY from './KEY'

type SqlParameter<TValue = any> = {
  readonly [KEY]: {
    readonly type: 'parameter'
    readonly value: TValue
  }
  toString(): string
}

export default SqlParameter
