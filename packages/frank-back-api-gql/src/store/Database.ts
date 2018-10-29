import {
  Pool,
  PoolClient,
  QueryArrayConfig,
  QueryArrayResult,
  QueryConfig,
  QueryResult,
  types,
} from 'pg'
import { SqlFragment, build, raw, sql as SQL } from 'sql'
import Log from 'log/Log'
import createLog from 'log/create'
import Mapper from './mappers/Mapper'

types.setTypeParser(16, x => x === 't') // boolean
types.setTypeParser(20, x => Number(x))
types.setTypeParser(21, x => Number(x))
types.setTypeParser(23, x => Number(x))
types.setTypeParser(700, x => Number(x))
types.setTypeParser(701, x => Number(x))
types.setTypeParser(1005, x => Number(x))
types.setTypeParser(1007, x => Number(x))
types.setTypeParser(1016, x => Number(x))
types.setTypeParser(1021, x => Number(x))
types.setTypeParser(1022, x => Number(x))
types.setTypeParser(1231, x => Number(x))
types.setTypeParser(1700, x => Number(x))

type TxStatus = 'delayed' | 'active'

type State = 'closed' | 'open' | 'tx-delayed' | 'tx-active'

export default class Database {
  public get log() {
    return this._log
  }

  public get state(): State {
    if (!this._pgclient) {
      return 'closed'
    }
    if (!this._txstatus) {
      return 'open'
    }
    return this._txstatus === 'delayed' ? 'tx-delayed' : 'tx-active'
  }

  public constructor(pgpool: Pool, options?: { setRole?: string }) {
    this._log = createLog('dal:Database')
    this._pgpool = pgpool
    this._options = options || {}
  }

  public async reset(error?: Error | true) {
    if (this._pgclient) {
      try {
        await this._pgclient.release(<Error>error)
      } catch (exc) {
        this.log.error('Failed to release client\r\n%O', exc)
      }

      delete this._pgclient
    }

    delete this._txstatus
  }

  public async open() {
    this.log.trace('Acquiring client')

    if (this._pgclient) {
      throw new Error('Already open')
    }

    try {
      this._pgclient = await this._pgpool.connect()
    } catch (exc) {
      this.log.error('Failed to acquire client\r\n%O', exc)
      throw exc
    }

    this.log.trace('Client acquired')

    if (this._options.setRole) {
      this.log.trace(`Setting role to ${this._options.setRole}`)

      try {
        await this._command(SQL`set role ${raw(this._options.setRole)}`)
      } catch (exc) {
        this.log.error(
          `Failed to set role to ${this._options.setRole}\r\n%O`,
          exc
        )

        try {
          this._pgclient.release(exc)
        } catch (exc2) {
          this.log.error('Failed to release client\r\n%O', exc2)
        }

        delete this._pgclient
        throw exc
      }

      this.log.debug(`Set role to ${this._options.setRole}`)
    }
  }

  public async close(error?: Error | true) {
    this.log.trace('Releasing client')

    if (!this._pgclient) {
      throw new Error('Not open')
    }

    try {
      this._pgclient.release(<Error>error)
    } catch (exc) {
      this.log.error('Failed to release client\r\n%O', exc)
      throw exc
    } finally {
      delete this._pgclient
      delete this._txstatus
    }

    this.log.trace('Client released')
  }

  public raw(queryConfig: QueryArrayConfig): Promise<QueryArrayResult>
  public raw(queryConfig: QueryConfig): Promise<QueryResult>
  public raw(
    queryTextOrConfig: string | QueryConfig,
    values?: any[]
  ): Promise<QueryResult>
  public raw(...args: any[]) {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    const [arg0, arg1] = args

    const text = typeof arg0 === 'string' ? arg0 : arg0.text
    const params = (typeof arg0 === 'string' ? arg1 : arg0.values) || []
    this.log.debug(`QUERY\r\nTEXT: %s\r\nPARAMS: %O`, text, params)

    return this._txstatus === 'delayed'
      ? this.begin().then(() => this._pgclient!.query(arg0, arg1))
      : this._pgclient.query(arg0, arg1)
  }

  public async command(sql: SqlFragment): Promise<void> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    if (this._txstatus === 'delayed') {
      await this.begin()
    }

    await this._command(sql)
  }

  public async query<T = any>(
    sql: SqlFragment,
    mapper?: Mapper<T>
  ): Promise<T[]> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    if (this._txstatus === 'delayed') {
      await this.begin()
    }

    const query = this.createQueryConfig(sql)
    const result = await this._pgclient.query(query)
    const rows = <T[]>result.rows
    return mapper ? rows.map(x => mapper(x)) : rows
  }

  public async scalars<T = any>(
    sql: SqlFragment,
    mapper?: Mapper<T>
  ): Promise<T[]> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    if (this._txstatus === 'delayed') {
      await this.begin()
    }

    const query = this.createQueryArrayConfig(sql)
    const result = await this._pgclient.query(query)
    const scalars = result.rows.map(x => <T>x[0])
    return mapper ? scalars.map(x => mapper(x)) : scalars
  }

  public async first<T = any>(
    sql: SqlFragment,
    mapper?: Mapper<T>
  ): Promise<T> {
    const rows = await this.query(sql)
    const first = rows[0]
    return mapper ? mapper(first) : first
  }

  public async scalar<T = any>(
    sql: SqlFragment,
    mapper?: Mapper<T>
  ): Promise<T> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    if (this._txstatus === 'delayed') {
      await this.begin()
    }

    const query = this.createQueryArrayConfig(sql)
    const result = await this._pgclient.query(query)
    const scalar = <T>result.rows[0][0]
    return mapper ? mapper(scalar) : scalar
  }

  public async begin(delayed?: boolean) {
    if (delayed) {
      this.log.trace('Delaying transaction')

      if (this._txstatus === 'active') {
        throw new Error('Already in transaction')
      }

      this._txstatus = 'delayed'
    } else {
      this.log.trace('Beginning transaction')

      if (!this._pgclient) {
        throw new Error('Not open')
      }

      if (this._txstatus === 'active') {
        throw new Error('Already in transaction')
      }

      try {
        await this._command(SQL`BEGIN`)
      } catch (exc) {
        this.log.error('Failed to begin transaction\r\n%O', exc)
        delete this._txstatus
        throw exc
      }

      this._txstatus = 'active'
      this.log.trace('Began transaction')
    }
  }

  public async commit() {
    this.log.trace('Committing transaction')

    if (!this._pgclient) {
      throw new Error('Not open')
    }

    if (!this._txstatus) {
      throw new Error('Not in transaction')
    }

    if (this._txstatus === 'delayed') {
      delete this._txstatus
      this.log.trace('Cancelled delayed transaction')
    } else {
      try {
        await this._command(SQL`COMMIT`)
      } catch (exc) {
        this.log.error('Failed to commit transaction\r\n%O', exc)
        throw exc
      }

      delete this._txstatus
      this.log.trace('Committed transaction')
    }
  }

  public async rollback() {
    this.log.trace('Rolling back transaction')

    if (!this._pgclient) {
      throw new Error('Not connected')
    }

    if (!this._txstatus) {
      throw new Error('Not in transaction')
    }

    if (this._txstatus === 'delayed') {
      delete this._txstatus
      this.log.trace('Cancelled delayed transaction')
    } else {
      try {
        await this._command(SQL`ROLLBACK`)
      } catch (exc) {
        this.log.error('Failed to roll back transaction\r\n%O', exc)
        throw exc
      }

      delete this._txstatus
      this.log.debug('Rolled back transaction')
    }
  }

  private readonly _log: Log
  private readonly _pgpool: Pool
  private readonly _options: { setRole?: string }
  private _pgclient?: PoolClient
  private _txstatus?: TxStatus

  private createQueryConfig(sql: SqlFragment): QueryConfig {
    const { text, params } = build(sql)
    this.log.debug(`QUERY\r\nTEXT: %s\r\nPARAMS: %O`, text, params)
    return { text, values: params }
  }

  private createQueryArrayConfig(sql: SqlFragment): QueryArrayConfig {
    const { text, params } = build(sql)
    this.log.debug(`QUERY\r\nTEXT: %s\r\nPARAMS: %O`, text, params)
    return { text, values: params, rowMode: 'array' }
  }

  private _command(sql: SqlFragment): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = this.createQueryArrayConfig(sql)
      this._pgclient!.query(query, err => (err ? reject(err) : resolve()))
    })
  }
}
