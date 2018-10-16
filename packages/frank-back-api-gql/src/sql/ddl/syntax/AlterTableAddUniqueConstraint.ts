import SqlLiteral from '../../ast/SqlLiteral'
import AlterTableAddUniqueConstraintColumn from './AlterTableAddUniqueConstraintColumn'

export type AlterTableAddUniqueConstraintConfig<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> = {
  name: TTableName
  constraintName: null | TConstraintName
}

export default class AlterTableAddUniqueConstraint<
  TTableName extends string | SqlLiteral,
  TConstraintName extends string | SqlLiteral
> {
  public constructor(
    config: AlterTableAddUniqueConstraintConfig<TTableName, TConstraintName>
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
        columns: [name],
      }
    )
  }

  protected readonly config: AlterTableAddUniqueConstraintConfig<
    TTableName,
    TConstraintName
  >
}
