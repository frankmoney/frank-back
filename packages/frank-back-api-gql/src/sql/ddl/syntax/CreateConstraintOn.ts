import { SqlLiteral } from '../../ast'
import CreateConstraintOnColumn from './CreateConstraintOnColumn'

export type CreateConstraintOnConfig<
  TConstraintName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> = {
  name: null | TConstraintName
  target: TTargetName
}

export default class CreateConstraintOn<
  TConstraintName extends string | SqlLiteral,
  TTargetName extends string | SqlLiteral
> {
  public constructor(
    config: CreateConstraintOnConfig<TConstraintName, TTargetName>
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
      columns: [name],
    })
  }

  protected readonly config: CreateConstraintOnConfig<
    TConstraintName,
    TTargetName
  >
}
