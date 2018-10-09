import { SqlLiteral } from '../../ast'
import CreateForeignKeyOnColumnTo from './CreateForeignKeyOnColumnTo'

export type CreateForeignKeyOnColumnConfig<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral
> = {
  name: null | TConstraintName
  source: TSourceName
  sourceColumns: (string | SqlLiteral)[]
}

export default class CreateForeignKeyOnColumn<
  TConstraintName extends string | SqlLiteral,
  TSourceName extends string | SqlLiteral
> {
  public constructor(
    config: CreateForeignKeyOnColumnConfig<TConstraintName, TSourceName>
  ) {
    this.config = config
  }

  public to<TTargetName extends string | SqlLiteral>(table: TTargetName) {
    return new CreateForeignKeyOnColumnTo<
      TConstraintName,
      TSourceName,
      TTargetName
    >({
      ...this.config,
      target: table,
    })
  }

  private readonly config: CreateForeignKeyOnColumnConfig<
    TConstraintName,
    TSourceName
  >
}
