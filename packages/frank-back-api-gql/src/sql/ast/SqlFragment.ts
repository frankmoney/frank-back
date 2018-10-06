import KEY from './KEY'
import Sql from './Sql'

type SqlFragment = {
  readonly [KEY]: {
    readonly type: 'fragment'
    readonly children: Sql[]
  }
}

export default SqlFragment
