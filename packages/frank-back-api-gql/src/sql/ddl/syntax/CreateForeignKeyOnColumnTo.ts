import { SqlLiteral } from '../../ast'
import CreateForeignKeyOnColumnToColumn from './CreateForeignKeyOnColumnToColumn'

export type CreateForeignKeyOnColumnToConfig<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> = {
  name: null | TConstraintName
  source: TSourceName
  sourceColumns: (string | SqlLiteral)[]
  target: TTargetName
}

export default class CreateForeignKeyOnColumnTo<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> {
  public constructor(
    config: CreateForeignKeyOnColumnToConfig<
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
      targetColumns: [name],
    })
  }

  protected readonly config: CreateForeignKeyOnColumnToConfig<
    TConstraintName,
    TSourceName,
    TTargetName
  >
}
