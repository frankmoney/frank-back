import { SqlLiteral } from '../../ast'
import AlterTableAddForeignKey from './AlterTableAddForeignKey'

export type AlterTableConfig<TTableName extends string | SqlLiteral> = {
  name: TTableName
}

export default class AlterTable<TTableName extends string | SqlLiteral> {
  public constructor(config: AlterTableConfig<TTableName>) {
    this.config = config
  }

  public addForeignKey<TConstraintName extends string | SqlLiteral>(
    name?: TConstraintName
  ) {
    return new AlterTableAddForeignKey<TTableName, TConstraintName>({
      ...this.config,
      constraintName: name || null,
    })
  }

  protected readonly config: AlterTableConfig<TTableName>
}
