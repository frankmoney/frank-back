import { SqlLiteral } from '../../ast'
import AlterSequence from './AlterSequence'
import AlterTable from './AlterTable'

export default class Alter {
  public sequence<TSequenceName extends string | SqlLiteral>(
    name: TSequenceName
  ) {
    return new AlterSequence<TSequenceName>({ name })
  }

  public table<TTableName extends string | SqlLiteral>(name: TTableName) {
    return new AlterTable<TTableName>({ name })
  }
}
