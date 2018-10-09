import { SqlLiteral } from '../../ast'
import CreateForeignKeyOnColumnTo from './CreateForeignKeyOnColumnTo'

export type AlterTableAddForeignKeyColumnConfig<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> = {
  name: TTableName
  constraintName: null | TConstraintName
  columns: (string | SqlLiteral)[]
}

export default class AlterTableAddForeignKeyColumn<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> {
  public constructor(
    config: AlterTableAddForeignKeyColumnConfig<TTableName, TConstraintName>
  ) {
    this.config = config
  }

  public column(
    name: string | SqlLiteral | ((table: TTableName) => string | SqlLiteral)
  ) {
    if (typeof name === 'function') {
      name = name(this.config.name)
    }

    return new AlterTableAddForeignKeyColumn<TTableName, TConstraintName>({
      ...this.config,
      columns: [...this.config.columns, name],
    })
  }

  public to<TTargetName extends string | SqlLiteral>(table: TTargetName) {
    return new CreateForeignKeyOnColumnTo<
      TConstraintName,
      TTableName,
      TTargetName
    >({
      name: this.config.constraintName,
      source: this.config.name,
      sourceColumns: this.config.columns,
      target: table,
    })
  }

  protected readonly config: AlterTableAddForeignKeyColumnConfig<
    TTableName,
    TConstraintName
  >
}
