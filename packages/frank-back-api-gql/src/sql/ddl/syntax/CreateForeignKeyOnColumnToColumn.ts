import Database from 'store/Database'
import { SqlLiteral } from '../../ast'
import { join, sql } from '../../gen'
import Executable from './Executable'

export type CreateForeignKeyOnColumnToColumnConfig<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> = {
  name: null | TConstraintName
  source: TSourceName
  sourceColumns: (string | SqlLiteral)[]
  target: TTargetName
  targetColumns: (string | SqlLiteral)[]
}

export default class CreateForeignKeyOnColumnToColumn<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> implements Executable {
  public constructor(
    config: CreateForeignKeyOnColumnToColumnConfig<
      TConstraintName,
      TSourceName,
      TTargetName
    >
  ) {
    this.config = config
  }

  public column(
    name: string | SqlLiteral | ((table: TTargetName) => string | SqlLiteral)
  ) {
    if (typeof name === 'function') {
      name = name(this.config.target)
    }

    return new CreateForeignKeyOnColumnToColumn<
      TConstraintName,
      TSourceName,
      TTargetName
    >({
      ...this.config,
      targetColumns: [...this.config.targetColumns, name],
    })
  }

  public async exec(db: Database) {
    const source = this.config.source.toString()
    const sourceColumns = this.config.sourceColumns.map(x => `"${x}"`)

    const target = this.config.target.toString()
    const targetColumns = this.config.targetColumns.map(x => `"${x}"`)

    const name = this.config.name
      ? this.config.name.toString()
      : `fk:${this.config.source}(${this.config.sourceColumns.join(',')})->${
          this.config.target
        }(${this.config.targetColumns.join(',')})`

    await db.command(sql.unparameterized`
      alter table "${source}"
      add constraint "${name}"
      foreign key ( ${join(sourceColumns, ',')} )
      references "${target}" ( ${join(targetColumns, ', ')} );
    `)
  }

  protected readonly config: CreateForeignKeyOnColumnToColumnConfig<
    TConstraintName,
    TSourceName,
    TTargetName
  >
}
