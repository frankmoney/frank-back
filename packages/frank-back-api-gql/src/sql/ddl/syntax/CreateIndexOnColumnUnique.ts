import Database from 'store/Database'
import { Sql } from '../../ast'
import { join, sql } from '../../gen'
import Executable from './Executable'

export type CreateIndexOnColumnUniqueConfig<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TIndexName
  target: TTargetName
  columns: (string | Sql)[]
}

export default class CreateIndexOnColumnUnique<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> implements Executable {
  public constructor(
    config: CreateIndexOnColumnUniqueConfig<TIndexName, TTargetName>
  ) {
    this.config = config
  }

  public async exec(db: Database): Promise<void> {
    const target = this.config.target.toString()
    const name = this.config.name
      ? this.config.name.toString()
      : `ix:${this.config.target}(${this.config.columns
          .map(x => x.toString())
          .join(',')})`
    const columns = this.config.columns.map(x => `"${x}"`)

    await db.command(sql.unparameterized`
      create unique index "${name}"
      on "${target}" ( ${join(columns, ', ')} )
    `)
  }

  protected readonly config: CreateIndexOnColumnUniqueConfig<
    TIndexName,
    TTargetName
  >
}
