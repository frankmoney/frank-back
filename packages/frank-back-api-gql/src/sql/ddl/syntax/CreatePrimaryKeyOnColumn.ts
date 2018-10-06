import Database from 'store/Database'
import { Sql } from '../../ast'
import { join, raw, sql } from '../../gen'
import Executable from './Executable'

export type CreatePrimaryKeyOnColumnConfig<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TConstraintName
  target: TTargetName
  columns: (string | Sql)[]
}

export default class CreatePrimaryKeyOnColumn<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> implements Executable {
  public constructor(
    config: CreatePrimaryKeyOnColumnConfig<TConstraintName, TTargetName>
  ) {
    this.config = config
  }

  public async exec(db: Database): Promise<void> {
    const target = this.config.target.toString()
    const name = this.config.name
      ? this.config.name.toString()
      : `pk:${this.config.target}`
    const columns = this.config.columns.map(x => `"${x}"`)

    await db.command(sql.unparameterized`
      alter table "${target}"
      add constraint "${name}"
      primary key ( ${join(columns, ', ')} );
    `)
  }

  private readonly config: CreatePrimaryKeyOnColumnConfig<
    TConstraintName,
    TTargetName
  >
}
