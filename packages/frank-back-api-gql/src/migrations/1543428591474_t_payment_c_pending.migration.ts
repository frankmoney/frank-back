/* tslint:disable:max-classes-per-file */
import { raw, sql } from 'sql'
import {
  IAlter,
  ICreate,
  ICreateTable0,
  ICreateTable1,
  IDrop,
  Identifier,
  TableName,
  alter,
  create,
  drop,
} from 'sql/ddl'
import Database from 'store/Database'
import { up, down } from './1543428591474_t_payment_c_pending'

export type CreateExTableOptions<TTableName extends TableName> = {
  id?: boolean
  pid?: boolean
  createdAt?: boolean
  creatorId?: boolean
  updatedAt?: boolean
  updaterId?: boolean
}

// tslint:disable:unified-signatures
interface ICreateEx extends ICreate {
  table(name: string): ICreateTable0
  table<TTableName extends TableName>(
    name: TTableName
  ): ICreateTable1<TTableName>

  table<TTableName extends TableName>(
    name: TTableName,
    options: true | CreateExTableOptions<TTableName>
  ): ICreateTable1<TTableName>
}
// tslint:enable:unified-signatures

const createEx = Object.create(create)
createEx.table = function table<TTableName extends TableName>(
  name: any,
  options: CreateExTableOptions<TTableName>
) {
  let builder = create.table(name)

  if (options) {
    const columns = {
      id: <Identifier>(<any>name).id || 'c_id',
      pid: <Identifier>(<any>name).pid || 'c_pid',
      createdAt: <Identifier>(<any>name).createdAt || 'c_created_at',
      creatorId: <Identifier>(<any>name).creatorId || 'c_creator_id',
      updatedAt: <Identifier>(<any>name).updatedAt || 'c_updated_at',
      updaterId: <Identifier>(<any>name).updaterId || 'c_updater_id',
    }

    if (options === true || options.id) {
      const sequenceName = sql`sq:${raw(name)}(${raw(columns.id)})`
      builder = builder
        .column(
          columns.id,
          `bigint not null default nextval('${sequenceName}')`
        )
        .before(db => create.sequence(sequenceName).exec(db))
        .after(db =>
          alter
            .sequence(sequenceName)
            .ownedBy(name, columns.id)
            .exec(db)
        )
        .after(db =>
          create
            .constraint()
            .on(name)
            .column(columns.id)
            .primaryKey()
            .exec(db)
        )
    }

    if (options === true || options.pid) {
      const sequenceName = sql`sq:${raw(name)}(${raw(columns.pid)})`
      builder = builder
        .column(
          columns.pid,
          `bigint not null default nextval('${sequenceName}')`
        )
        .before(db => create.sequence(sequenceName).exec(db))
        .after(db =>
          alter
            .sequence(sequenceName)
            .ownedBy(name, columns.pid)
            .exec(db)
        )
        .after(db =>
          create
            .constraint()
            .on(name)
            .column(columns.pid)
            .unique()
            .exec(db)
        )
    }

    if (options === true || options.createdAt) {
      builder = builder.column(
        columns.createdAt,
        `timestamp not null default (now() at time zone 'utc')`
      )
    }

    if (options === true || options.updatedAt) {
      builder = builder.column(columns.updatedAt, `timestamp`)
    }

    if (options === true || options.creatorId) {
      builder = builder.column(columns.creatorId, `bigint not null`)
    }

    if (options === true || options.updaterId) {
      builder = builder.column(columns.updaterId, `bigint`)
    }
  }

  return builder
}

export type MigrationContextExecBuilderArg = {
  alter: IAlter
  create: ICreateEx
  drop: IDrop
}

export type MigrationContextDdlBuilder = (
  arg: MigrationContextExecBuilderArg
) => { exec: (db: Database) => Promise<void> }

export type MigrationContextDdl = (
  ...builders: MigrationContextDdlBuilder[]
) => Promise<void>

export type MigrationContext = {
  db: Database
  ddl: MigrationContextDdl
}

export const createDdl = (db: Database): MigrationContextDdl => async (
  ...builders
) => {
  for (const builder of builders) {
    await builder({
      alter,
      create: createEx,
      drop,
    }).exec(db)
  }
}

export const migration = {
  id: '1543428591474',
  name: 't_payment_c_pending',
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
