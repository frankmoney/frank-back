/* tslint:disable:max-classes-per-file */
import { Sql } from 'sql'
import {
  Alter,
  Create,
  CreateTable,
  CreateTableColumn,
  Drop,
  alter,
  create,
  drop,
} from 'sql/ddl'
import Database from 'store/Database'
import { up, down } from './1538827208089_t_team'

export class CreateEx extends Create {
  public table<TTableName extends string | Sql>(
    name: TTableName
  ): CreateTable<TTableName>
  public table<TTableName extends string | Sql>(
    name: TTableName,
    extended: true
  ): CreateTableColumn<TTableName>
  public table<TTableName extends string | Sql>(
    name: TTableName,
    extended?: true
  ): CreateTable<TTableName> | CreateTableColumn<TTableName> {
    return extended
      ? create
          .table(name)
          .before(db => create.sequence(`sq:${name}(c_id)`).exec(db))
          .before(db => create.sequence(`sq:${name}(c_pid)`).exec(db))
          .after(db =>
            alter
              .sequence(`sq:${name}(c_id)`)
              .ownedBy(name, 'c_id')
              .exec(db)
          )
          .after(db =>
            alter
              .sequence(`sq:${name}(c_pid)`)
              .ownedBy(name, 'c_pid')
              .exec(db)
          )
          .after(db =>
            create
              .constraint()
              .on(name)
              .column('c_id')
              .primaryKey()
              .exec(db)
          )
          .after(db =>
            create
              .index()
              .on(name)
              .column('c_pid')
              .unique()
              .exec(db)
          )
          .column('c_id', `bigint not null default nextval('sq:${name}(c_id)')`)
          .column('c_pid', `bigint not null default nextval('sq:${name}(c_pid)')`)
          .column(
            'c_created_at',
            `timestamp not null default (now() at time zone 'utc')`
          )
          .column('c_creator_id', `bigint`)
          .column('c_updated_at', `timestamp`)
          .column('c_updater_id', `bigint`)
      : create.table(name)
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
  id: '1538827208089',
  name: 't_team',
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
