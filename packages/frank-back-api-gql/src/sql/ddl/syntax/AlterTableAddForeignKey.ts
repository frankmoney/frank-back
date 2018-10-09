import SqlLiteral from '../../ast/SqlLiteral'
import AlterTableAddForeignKeyColumn from './AlterTableAddForeignKeyColumn'

export type AlterTableAddForeignKeyConfig<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> = {
  name: TTableName
  constraintName: null | TConstraintName
}

export default class AlterTableAddForeignKey<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> {
  public constructor(
    config: AlterTableAddForeignKeyConfig<TTableName, TConstraintName>
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
      columns: [name],
    })
  }

  protected readonly config: AlterTableAddForeignKeyConfig<
    TTableName,
    TConstraintName
  >
}
