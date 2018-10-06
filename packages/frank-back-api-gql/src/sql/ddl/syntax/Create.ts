import { Sql } from '../../ast'
import CreateConstraint from './CreateConstraint'
import CreateIndex from './CreateIndex'
import CreateSequence from './CreateSequence'
import CreateTable from './CreateTable'

export default class Create {
  public constraint<TConstraintName extends string | Sql>(
    name?: TConstraintName
  ) {
    return new CreateConstraint({ name: name || null })
  }

  public index<TIndexName extends string | Sql>(name?: TIndexName) {
    return new CreateIndex<TIndexName>({ name: name || null })
  }

  public sequence<TSequenceName extends string | Sql>(name: TSequenceName) {
    return new CreateSequence<TSequenceName>({ name })
  }

  public table<TTableName extends string | Sql>(name: TTableName) {
    return new CreateTable<TTableName>({ name, before: [], after: [] })
  }
}
