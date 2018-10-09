import { SqlLiteral } from '../../ast'
import CreateForeignKeyOnColumn from './CreateForeignKeyOnColumn'
import CreatePrimaryKeyOnColumn from './CreatePrimaryKeyOnColumn'

export type CreateConstraintOnColumnConfig<
  TConstraintName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> = {
  name: null | TConstraintName
  target: TTargetName
  columns: (string | SqlLiteral)[]
}

export default class CreateConstraintOnColumn<
  TConstraintName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> {
  public constructor(
    config: CreateConstraintOnColumnConfig<TConstraintName, TTargetName>
  ) {
    this.config = config
  }

  public column(
    name: string | SqlLiteral | ((target: TTargetName) => string | SqlLiteral)
  ) {
    if (typeof name === 'function') {
      name = name(this.config.target)
    }
    return new CreateConstraintOnColumn({
      ...this.config,
      columns: [...this.config.columns, name],
    })
  }

  public primaryKey() {
    return new CreatePrimaryKeyOnColumn(this.config)
  }

  public foreignKey() {
    return new CreateForeignKeyOnColumn<TConstraintName, TTargetName>({
      name: this.config.name,
      source: this.config.target,
      sourceColumns: this.config.columns,
    })
  }

  protected readonly config: CreateConstraintOnColumnConfig<
    TConstraintName,
    TTargetName
  >
}
