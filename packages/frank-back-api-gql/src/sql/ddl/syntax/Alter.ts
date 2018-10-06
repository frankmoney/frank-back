import { Sql } from '../../ast'
import AlterSequence from './AlterSequence'

export default class Alter {
  public sequence<TSequenceName extends string | Sql>(name: TSequenceName) {
    return new AlterSequence<TSequenceName>({ name })
  }
}
