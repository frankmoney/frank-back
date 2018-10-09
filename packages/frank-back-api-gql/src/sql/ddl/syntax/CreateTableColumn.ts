import Database from 'store/Database'
import { Sql } from '../../ast'
import { join, sql } from '../../gen'
import Exec from './Exec'
import Executable from './Executable'

export type CreateTableColumnConfig<TTableName extends string | Sql> = {
  name: TTableName
  before: Exec[]
  after: Exec[]
  columns: {
    name: string | Sql
    def: string | Sql
  }[]
}

export default class CreateTableColumn<TTableName extends string | Sql>
  implements Executable {
  public constructor(config: CreateTableColumnConfig<TTableName>) {
    this.config = config
  }

  public before(exec: Exec) {
    return new CreateTableColumn<TTableName>({
      ...this.config,
      before: [...this.config.before, exec],
    })
  }

  public after(exec: Exec) {
    return new CreateTableColumn<TTableName>({
      ...this.config,
      after: [...this.config.after, exec],
    })
  }

  public column(
    name: string | Sql | ((table: TTableName) => string | Sql),
    def: string | Sql
  ) {
    if (typeof name === 'function') {
      name = name(this.config.name)
    }
    return new CreateTableColumn<TTableName>({
      ...this.config,
      columns: [...this.config.columns, { name, def }],
    })
  }

  public async exec(db: Database): Promise<void> {
    for (const each of this.config.before) {
      await each(db)
    }

    const name = this.config.name.toString()
    const columns = this.config.columns.map(
      x => sql.unparameterized`"${x.name}" ${x.def}`
    )

    await db.command(sql.unparameterized`
      create table "${name}" (
        ${join(columns, ',\n        ')}
      );
    `)

    for (const each of this.config.after) {
      await each(db)
    }
  }

  protected readonly config: CreateTableColumnConfig<TTableName>
}
