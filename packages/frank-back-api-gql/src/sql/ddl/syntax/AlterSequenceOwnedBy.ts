import Database from 'store/Database'
import { Sql } from '../../ast'
import { raw, sql } from '../../gen'
import Executable from './Executable'

export type AlterSequenceOwnedByConfig<TSequenceName extends string | Sql> = {
  name: TSequenceName
  ownedBy: {
    table: string | Sql
    column: string | Sql
  }
}

export default class AlterSequenceOwnedBy<TSequenceName extends string | Sql>
  implements Executable {
  public constructor(config: AlterSequenceOwnedByConfig<TSequenceName>) {
    this.config = config
  }

  public async exec(db: Database): Promise<void> {
    const name = this.config.name
    const ownedByTable = this.config.ownedBy.table
    const ownedByColumn = this.config.ownedBy.column

    await db.command(sql.unparameterized`
      alter sequence "${name}"
      owned by "${ownedByTable}"."${ownedByColumn}";
    `)
  }

  protected readonly config: AlterSequenceOwnedByConfig<TSequenceName>
}
