import Database from 'store/Database'
import { SqlLiteral } from '../../ast'
import { join, sql } from '../../gen'
import Executable from './Executable'

export type AlterTableAddUniqueConstraintColumnConfig<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> = {
  name: TTableName
  constraintName: null | TConstraintName
  columns: (string | SqlLiteral)[]
}

export default class AlterTableAddUniqueConstraintColumn<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> implements Executable {
  public constructor(
    config: AlterTableAddUniqueConstraintColumnConfig<
      TTableName,
      TConstraintName
    >
  ) {
    this.config = config
  }

  public column(
    name: string | SqlLiteral | ((table: TTableName) => string | SqlLiteral)
  ) {
    if (typeof name === 'function') {
      name = name(this.config.name)
    }

    return new AlterTableAddUniqueConstraintColumn<TTableName, TConstraintName>(
      {
        ...this.config,
        columns: [...this.config.columns, name],
      }
    )
  }

  public async exec(db: Database) {
    const tableName = this.config.name.toString()
    const columnNames = this.config.columns.map(x => `"${x}"`)

    const constraintName = this.config.constraintName
      ? this.config.constraintName.toString()
      : `uq:${tableName}(${this.config.columns.join(',')})`

    await db.command(sql.unparameterized`
      alter table "${tableName}"
      add constraint "${constraintName}"
      unique ( ${join(columnNames, ', ')} );
    `)
  }

  protected readonly config: AlterTableAddUniqueConstraintColumnConfig<
    TTableName,
    TConstraintName
  >
}
