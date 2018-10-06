import { Sql } from '../../ast'
import CreateIndexOnColumn from './CreateIndexOnColumn'

export type CreateIndexOnConfig<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TIndexName
  target: TTargetName
}

export default class CreateIndexOn<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> {
  public constructor(config: CreateIndexOnConfig<TIndexName, TTargetName>) {
    this.config = config
  }

  public column(name: string | Sql | ((target: TTargetName) => string | Sql)) {
    if (typeof name === 'function') {
      name = name(this.config.target)
    }
    return new CreateIndexOnColumn({
      ...this.config,
      columns: [name],
    })
  }

  protected readonly config: CreateIndexOnConfig<TIndexName, TTargetName>
}
