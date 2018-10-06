import { Sql } from '../../ast'
import CreateTableColumn from './CreateTableColumn'
import Exec from './Exec'

export type CreateTableConfig<TTableName extends string | Sql> = {
  name: TTableName
  before: Exec[]
  after: Exec[]
}

export default class CreateTable<TTableName extends string | Sql> {
  public constructor(config: CreateTableConfig<TTableName>) {
    this.config = config
  }

  public before(exec: Exec) {
    return new CreateTable<TTableName>({
      ...this.config,
      before: [...this.config.before, exec],
    })
  }

  public after(exec: Exec) {
    return new CreateTable<TTableName>({
      ...this.config,
      after: [...this.config.after, exec],
    })
  }

  public column(
    name: string | Sql | ((table: TTableName) => string | Sql),
    def: string | Sql
  ) {
    if (typeof name === 'function') {
      name = name(this.config.name)
    }

    return new CreateTableColumn<TTableName>({
      ...this.config,
      columns: [{ name, def }],
    })
  }

  protected readonly config: CreateTableConfig<TTableName>
}
