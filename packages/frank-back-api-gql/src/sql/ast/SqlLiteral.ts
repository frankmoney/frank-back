import KEY from './KEY'

type SqlLiteral = {
  readonly [KEY]: {
    readonly type: 'literal'
    readonly text: string
  }
}

export default SqlLiteral
