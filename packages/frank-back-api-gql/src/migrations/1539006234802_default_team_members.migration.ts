/* tslint:disable:max-classes-per-file */
import { SqlLiteral } from 'sql'
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
import { up, down } from './1539006234802_default_team_members'

export type CreateExTableOptions<TTableName extends string | SqlLiteral> = {
  columns?:
    | boolean
    | {
        id?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        pid?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        createdAt?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        creatorId?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        updatedAt?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        updaterId?:
          | boolean
          | string
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
      }
  constraints?:
    | boolean
    | {
        id?:
          | boolean
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
      }
  indexes?:
    | boolean
    | {
        pid?:
          | boolean
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
      }
  sequences?:
    | boolean
    | {
        id?:
          | boolean
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
        pid?:
          | boolean
          | ((
              builder: CreateTableColumn<TTableName>,
              name: TTableName
            ) => CreateTableColumn<TTableName>)
      }
}

export type FinalCreateExTableOptions<
  TTableName extends string | SqlLiteral
> = {
  columns: FinalCreateExTableOptionsColumns<TTableName>
  constraints: FinalCreateExTableOptionsConstraints<TTableName>
  indexes: FinalCreateExTableOptionsIndexes<TTableName>
  sequences: FinalCreateExTableOptionsSequences<TTableName>
}

export type FinalCreateExTableOptionsColumns<
  TTableName extends string | SqlLiteral
> = {
  id?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  pid?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  createdAt?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  creatorId?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  updatedAt?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  updaterId?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
}

export type FinalCreateExTableOptionsConstraints<
  TTableName extends string | SqlLiteral
> = {
  id?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
}

export type FinalCreateExTableOptionsIndexes<
  TTableName extends string | SqlLiteral
> = {
  pid?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
}

export type FinalCreateExTableOptionsSequences<
  TTableName extends string | SqlLiteral
> = {
  id?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
  pid?: (
    builder: CreateTableColumn<TTableName>,
    table: TTableName
  ) => CreateTableColumn<TTableName>
}

export class CreateEx extends Create {
  public table<TTableName extends string | SqlLiteral>(
    name: TTableName
  ): CreateTable<TTableName>
  public table<TTableName extends string | SqlLiteral>(
    name: TTableName,
    options: true | CreateExTableOptions<TTableName>
  ): CreateTableColumn<TTableName>
  public table<TTableName extends string | SqlLiteral>(
    name: TTableName,
    options?: true | CreateExTableOptions<TTableName>
  ): CreateTable<TTableName> | CreateTableColumn<TTableName> {
    if (options) {
      const columns = {
        id: <string | SqlLiteral>(<any>name).id || 'c_id',
        pid: <string | SqlLiteral>(<any>name).pid || 'c_pid',
        createdAt: <string | SqlLiteral>(<any>name).createdAt || 'c_created_at',
        creatorId: <string | SqlLiteral>(<any>name).creatorId || 'c_creator_id',
        updatedAt: <string | SqlLiteral>(<any>name).updatedAt || 'c_updated_at',
        updaterId: <string | SqlLiteral>(<any>name).updaterId || 'c_updater_id',
      }

      const defaultOptions: FinalCreateExTableOptions<TTableName> = {
        columns: {
          id: x =>
            x.column(
              columns.id,
              `bigint not null default nextval('sq:${name}(c_id)')`
            ),
          pid: x =>
            x.column(
              columns.pid,
              `bigint not null default nextval('sq:${name}(c_pid)')`
            ),
          createdAt: x =>
            x.column(
              columns.createdAt,
              `timestamp not null default (now() at time zone 'utc')`
            ),
          creatorId: x => x.column(columns.creatorId, `bigint`),
          updatedAt: x => x.column(columns.updatedAt, `timestamp`),
          updaterId: x => x.column(columns.updaterId, `bigint`),
        },
        constraints: {
          id: x =>
            x.after(db =>
              create
                .constraint()
                .on(name)
                .column(columns.id)
                .primaryKey()
                .exec(db)
            ),
        },
        indexes: {
          pid: x =>
            x.after(db =>
              create
                .index()
                .on(name)
                .column(columns.pid)
                .unique()
                .exec(db)
            ),
        },
        sequences: {
          id: x =>
            x
              .before(db =>
                create.sequence(`sq:${name}(${columns.id})`).exec(db)
              )
              .after(db =>
                alter
                  .sequence(`sq:${name}(${columns.id})`)
                  .ownedBy(name, columns.id)
                  .exec(db)
              ),
          pid: x =>
            x
              .before(db =>
                create.sequence(`sq:${name}(${columns.pid})`).exec(db)
              )
              .after(db =>
                alter
                  .sequence(`sq:${name}(${columns.pid})`)
                  .ownedBy(name, columns.pid)
                  .exec(db)
              ),
        },
      }

      let effectiveOptions: FinalCreateExTableOptions<TTableName>

      if (typeof options === 'object') {
        effectiveOptions = {
          columns: {},
          constraints: {},
          indexes: {},
          sequences: {},
        }

        if (options.columns !== false) {
          if (typeof options.columns === 'object') {
            effectiveOptions.columns = <any>{}

            const addColumn = (
              key: keyof FinalCreateExTableOptionsColumns<TTableName>,
              value?:
                | boolean
                | string
                | ((
                    builder: CreateTableColumn<TTableName>,
                    table: TTableName
                  ) => CreateTableColumn<TTableName>)
            ) => {
              if (value === undefined || value) {
                if (typeof value === 'string') {
                  effectiveOptions.columns[key] = x =>
                    x.column(columns[key], value)
                } else if (typeof value === 'function') {
                  effectiveOptions.columns[key] = value
                } else {
                  effectiveOptions.columns[key] = defaultOptions.columns[key]
                }
              }
            }

            addColumn('id', options.columns.id)
            addColumn('pid', options.columns.pid)
            addColumn('createdAt', options.columns.createdAt)
            addColumn('creatorId', options.columns.creatorId)
            addColumn('updatedAt', options.columns.updatedAt)
            addColumn('updaterId', options.columns.updaterId)
          } else {
            effectiveOptions.columns = defaultOptions.columns
          }
        }

        if (options.constraints !== false) {
          if (typeof options.constraints === 'object') {
            effectiveOptions.constraints = <any>{}

            if (
              options.constraints.id === undefined ||
              options.constraints.id
            ) {
              if (typeof options.constraints.id === 'function') {
                effectiveOptions.constraints.id = options.constraints.id
              } else {
                effectiveOptions.constraints.id = defaultOptions.constraints.id
              }
            }
          } else {
            effectiveOptions.constraints = defaultOptions.constraints
          }
        }

        if (options.indexes !== false) {
          if (typeof options.indexes === 'object') {
            effectiveOptions.indexes = <any>{}

            if (options.indexes.pid === undefined || options.indexes.pid) {
              if (typeof options.indexes.pid === 'function') {
                effectiveOptions.indexes.pid = options.indexes.pid
              } else {
                effectiveOptions.indexes.pid = defaultOptions.indexes.pid
              }
            }
          } else {
            effectiveOptions.indexes = defaultOptions.indexes
          }
        }

        if (options.sequences !== false) {
          if (typeof options.sequences === 'object') {
            effectiveOptions.sequences = <any>{}

            if (options.sequences.id === undefined || options.sequences.id) {
              if (typeof options.sequences.id === 'function') {
                effectiveOptions.sequences.id = options.sequences.id
              } else {
                effectiveOptions.sequences.id = defaultOptions.sequences.id
              }
            }

            if (options.sequences.pid === undefined || options.sequences.pid) {
              if (typeof options.sequences.pid === 'function') {
                effectiveOptions.sequences.pid = options.sequences.pid
              } else {
                effectiveOptions.sequences.pid = defaultOptions.sequences.pid
              }
            }
          } else {
            effectiveOptions.sequences = defaultOptions.sequences
          }
        }
      } else {
        effectiveOptions = defaultOptions
      }

      let builder = <CreateTableColumn<TTableName>>(<any>create.table(name))

      if (effectiveOptions.sequences.id) {
        builder = effectiveOptions.sequences.id(builder, name)
      }

      if (effectiveOptions.sequences.pid) {
        builder = effectiveOptions.sequences.pid(builder, name)
      }

      if (effectiveOptions.columns.id) {
        builder = effectiveOptions.columns.id(builder, name)
      }

      if (effectiveOptions.columns.pid) {
        builder = effectiveOptions.columns.pid(builder, name)
      }

      if (effectiveOptions.columns.createdAt) {
        builder = effectiveOptions.columns.createdAt(builder, name)
      }

      if (effectiveOptions.columns.creatorId) {
        builder = effectiveOptions.columns.creatorId(builder, name)
      }

      if (effectiveOptions.columns.updatedAt) {
        builder = effectiveOptions.columns.updatedAt(builder, name)
      }

      if (effectiveOptions.columns.updaterId) {
        builder = effectiveOptions.columns.updaterId(builder, name)
      }

      if (effectiveOptions.constraints.id) {
        builder = effectiveOptions.constraints.id(builder, name)
      }

      if (effectiveOptions.indexes.pid) {
        builder = effectiveOptions.indexes.pid(builder, name)
      }

      return builder
    }

    return create.table(name)
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
      create: new CreateEx(),
      drop,
    }).exec(db)
  }
}

export const migration = {
  id: '1539006234802',
  name: 'default_team_members',
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
