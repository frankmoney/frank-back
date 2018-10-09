import { SqlLiteral } from '../../ast'
import CreateConstraintOn from './CreateConstraintOn'

export type CreateConstraintConfig<
  TConstraintName extends string | SqlLiteral
> = {
  name: null | TConstraintName
}

export default class CreateConstraint<
  TConstraintName extends string | SqlLiteral
> {
  public constructor(config: CreateConstraintConfig<TConstraintName>) {
    this.config = config
  }

  public on<TTargetName extends string | SqlLiteral>(target: TTargetName) {
    return new CreateConstraintOn<TConstraintName, TTargetName>({
      ...this.config,
      target,
    })
  }

  protected readonly config: CreateConstraintConfig<TConstraintName>
}
