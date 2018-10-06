import { Sql } from '../../ast'
import CreateIndexOn from './CreateIndexOn'

export type CreateIndexConfig<TIndexName extends string | Sql> = {
  name: null | TIndexName
}

export default class CreateIndex<TIndexName extends string | Sql> {
  public constructor(config: CreateIndexConfig<TIndexName>) {
    this.config = config
  }

  public on<TTargetName extends string | Sql>(target: TTargetName) {
    return new CreateIndexOn<TIndexName, TTargetName>({
      ...this.config,
      target,
    })
  }

  protected readonly config: CreateIndexConfig<TIndexName>
}
