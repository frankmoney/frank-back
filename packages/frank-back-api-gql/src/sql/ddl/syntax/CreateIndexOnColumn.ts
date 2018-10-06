import { Sql } from '../../ast'
import CreateIndexOnColumnUnique from './CreateIndexOnColumnUnique'

export type CreateIndexOnColumnConfig<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> = {
  name: null | TIndexName
  target: TTargetName
  columns: (string | Sql)[]
}

export default class CreateIndexOnColumn<
  TIndexName extends string | Sql,
  TTargetName extends string | Sql
> {
  public constructor(
    config: CreateIndexOnColumnConfig<TIndexName, TTargetName>
  ) {
    this.config = config
  }

  public column(name: string | Sql | ((target: TTargetName) => string | Sql)) {
    if (typeof name === 'function') {
      name = name(this.config.target)
    }
    return new CreateIndexOnColumn({
      ...this.config,
      columns: [...this.config.columns, name],
    })
  }

  public unique() {
    return new CreateIndexOnColumnUnique(this.config)
  }

  protected readonly config: CreateIndexOnColumnConfig<TIndexName, TTargetName>
}
