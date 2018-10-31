import KEY from './KEY'

type SqlLiteral = {
  readonly [KEY]: {
    readonly type: 'literal'
    readonly text: string
  }
  toString(): string
}

export default SqlLiteral
