/* tslint:disable:max-classes-per-file */
import { Sql } from 'sql'
import { Alter, Create, CreateTable, Drop, alter, create, drop } from 'sql/ddl'
import Database from 'store/Database'
import { up, down } from './1538361391910_t_user'

export class CreateTableEx<TTableName extends string | Sql> extends CreateTable<
  TTableName
> {
  public async exec(db: Database): Promise<void> {
    await create.sequence(`sq:${this.name}(c_id)`).exec(db)
    await create.sequence(`sq:${this.name}(c_pid)`).exec(db)
    await super.exec(db)
    await alter
      .sequence(`sq:${this.name}(c_id)`)
      .ownedBy(this.name, 'c_id')
      .exec(db)
    await alter
      .sequence(`sq:${this.name}(c_pid)`)
      .ownedBy(this.name, 'c_pid')
      .exec(db)
  }
}

export class CreateEx extends Create {
  public table<TTableName extends string | Sql>(
    name: TTableName
  ): CreateTable<TTableName>
  public table<TTableName extends string | Sql>(
    name: TTableName,
    extended: true
  ): CreateTableEx<TTableName>
  public table<TTableName extends string | Sql>(
    name: TTableName,
    extended?: true
  ): CreateTable<TTableName> | CreateTableEx<TTableName> {
    return extended
      ? new CreateTableEx<TTableName>(name)
      : new CreateTable<TTableName>(name)
  }
}

export type MigrationContextExecBuilderArg = {
  alter: Alter
  create: CreateEx
  drop: Drop
}

export type MigrationContextDdlBuilder = (
  arg: MigrationContextExecBuilderArg
) => { exec: (db: Database) => Promise<void> }

export type MigrationContextDdl = (
  builder: MigrationContextDdlBuilder
) => Promise<void>

export type MigrationContext = {
  db: Database
  ddl: MigrationContextDdl
}

export const createDdl = (
  db: Database
): MigrationContextDdl => async builder => {
  await builder({
    alter,
    create: new CreateEx(),
    drop,
  }).exec(db)
}

export const migration = {
  id: '1538361391910',
  name: 't_user',
  up: ({ db }: { db: Database }) =>
    up({
      db,
      ddl: createDdl(db),
    }),
  down: ({ db }: { db: Database }) =>
    down({
      db,
      ddl: createDdl(db),
    }),
}
