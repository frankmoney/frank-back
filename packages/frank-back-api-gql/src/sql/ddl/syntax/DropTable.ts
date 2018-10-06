import Database from 'store/Database'
import { Sql } from '../../ast'
import { sql } from '../../gen'

export type DropTableConfig<TTableName extends string | Sql> = {
  name: TTableName
}

export default class DropTable<TTableName extends string | Sql> {
  public constructor(config: DropTableConfig<TTableName>) {
    this.config = config
  }

  public async exec(db: Database): Promise<void> {
    const name = this.config.name.toString()

    await db.command(sql.unparameterized`
      drop table "${name}";
    `)
  }

  private readonly config: DropTableConfig<TTableName>
}
