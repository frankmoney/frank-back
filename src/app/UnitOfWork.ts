import { Pool, PoolClient, QueryConfig } from 'pg'
import SqlNode from 'app/dal/sql/SqlNode'
import buildSqlQuery from 'app/dal/sql/buildSqlQuery'
import createLogger, { Logger } from 'utils/createLogger'

const createQueryConfig = (sql: SqlNode): QueryConfig => {
  const { text, params } = buildSqlQuery(sql)
  return { text, values: params }
}

export default class UnitOfWork {
  public static create(scope: { pgpool: Pool }) {
    return new UnitOfWork(scope.pgpool)
  }

  public constructor(pgpool: Pool) {
    this._logger = createLogger('app:uow')
    this._pgpool = pgpool
  }

  public dispose() {
    this._logger.trace('Disposing')

    if (this._pgclient) {
      this._logger.debug('Rolling back transaction due to dispose')

      try {
        this._pgclient.query('ROLLBACK')
        this._pgclient.release()
      } catch (exc) {
        this._logger.error(`Failed to rollback during dispose:\r\n${exc}`)

        try {
          this._pgclient.release(exc)
        } catch (exc2) {
          this._logger.error(
            `Failed to release client during dispose:\r\n${exc2}`
          )
        }
      } finally {
        delete this._pgclient
      }
    }
  }

  public async commit() {
    this._logger.trace('Commit requested')

    try {
      if (this._pgclient) {
        this._logger.debug('Committing active transaction')

        await this._pgclient.query('COMMIT')
        this._pgclient.release()
        delete this._pgclient
      }
    } catch (exc) {
      this._logger.error(`Failed to commit:\r\n${exc}`)
      throw exc
    }
  }

  public async rollback() {
    this._logger.trace('Rollback requested')

    try {
      if (this._pgclient) {
        this._logger.debug('Rolling back active transaction')

        await this._pgclient.query('ROLLBACK')
        this._pgclient.release()
        delete this._pgclient
      }
    } catch (exc) {
      this._logger.error(`Failed to rollback:\r\n${exc}`)
    }
  }

  public async ensure() {
    try {
      if (!this._pgclient) {
        this._logger.debug('Opening connection')

        this._pgclient = await this._pgpool.connect()

        try {
          this._logger.debug('Starting transaction')

          await this._pgclient.query('BEGIN')
        } catch (exc) {
          try {
            this._pgclient.release(exc)
          } catch (exc2) {
            this._logger.error(`Failed to release client`)
          }
          throw exc
        }
      }
    } catch (exc) {
      this._logger.error(`Failed to ensure transaction:\r\n${exc}`)
      throw exc
    }
  }

  public async query<TRow = any>(sql: SqlNode): Promise<TRow[]> {
    await this.ensure()
    const query = createQueryConfig(sql)
    const result = await this._pgclient!.query(query)
    return <TRow[]>result.rows
  }

  public async first<TRow = any>(sql: SqlNode): Promise<TRow> {
    const rows = await this.query(sql)
    return rows[0]
  }

  private readonly _logger: Logger
  private readonly _pgpool: Pool
  private _pgclient?: PoolClient
}
