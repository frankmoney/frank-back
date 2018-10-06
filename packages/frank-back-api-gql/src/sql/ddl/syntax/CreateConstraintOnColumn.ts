import { Sql } from '../../ast'
import CreatePrimaryKeyOnColumn from './CreatePrimaryKeyOnColumn'

export type CreateConstraintOnColumnConfig<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TConstraintName
  target: TTargetName
  columns: (string | Sql)[]
}

export default class CreateConstraintOnColumn<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> {
  public constructor(
    config: CreateConstraintOnColumnConfig<TConstraintName, TTargetName>
  ) {
    this.config = config
  }

  public column(name: string | Sql | ((target: TTargetName) => string | Sql)) {
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

  protected readonly config: CreateConstraintOnColumnConfig<
    TConstraintName,
    TTargetName
  >
}
