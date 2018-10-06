import { Sql } from '../../ast'
import CreateConstraintOnColumn from './CreateConstraintOnColumn'

export type CreateConstraintOnConfig<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TConstraintName
  target: TTargetName
}

export default class CreateConstraintOn<
  TConstraintName extends string | Sql,
  TTargetName extends string | Sql
> {
  public constructor(
    config: CreateConstraintOnConfig<TConstraintName, TTargetName>
  ) {
    this.config = config
  }

  public column(name: string | Sql | ((target: TTargetName) => string | Sql)) {
    if (typeof name === 'function') {
      name = name(this.config.target)
    }
    return new CreateConstraintOnColumn({
      ...this.config,
      columns: [name],
    })
  }

  protected readonly config: CreateConstraintOnConfig<
    TConstraintName,
    TTargetName
  >
}
