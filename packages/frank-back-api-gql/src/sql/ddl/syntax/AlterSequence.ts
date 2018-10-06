import { Sql } from '../../ast'
import AlterSequenceOwnedBy from './AlterSequenceOwnedBy'

export type AlterSequenceConfig<TSequenceName extends string | Sql> = {
  name: TSequenceName
}

export default class AlterSequence<TSequenceName extends string | Sql> {
  public constructor(config: AlterSequenceConfig<TSequenceName>) {
    this.config = config
  }

  public ownedBy<TTableName extends string | Sql>(
    table: TTableName,
    column: string | Sql | ((table: TTableName) => string | Sql)
  ) {
    if (typeof column === 'function') {
      column = column(table)
    }
    return new AlterSequenceOwnedBy({
      ...this.config,
      ownedBy: {
        table,
        column,
      },
    })
  }

  private readonly config: AlterSequenceConfig<TSequenceName>
}
