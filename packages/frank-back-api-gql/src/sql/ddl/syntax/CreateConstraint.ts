import { Sql } from '../../ast'
import CreateConstraintOn from './CreateConstraintOn'

export type CreateConstraintConfig<TConstraintName extends string | Sql> = {
  name: null | TConstraintName
}

export default class CreateConstraint<TConstraintName extends string | Sql> {
  public constructor(config: CreateConstraintConfig<TConstraintName>) {
    this.config = config
  }

  public on<TTargetName extends string | Sql>(target: TTargetName) {
    return new CreateConstraintOn<TConstraintName, TTargetName>({
      ...this.config,
      target,
    })
  }

  protected readonly config: CreateConstraintConfig<TConstraintName>
}
