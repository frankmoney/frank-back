import Transaction from 'dal/Transaction'
import { Pool, PoolClient, QueryArrayConfig, QueryConfig } from 'pg'
import { SqlNode, buildSqlQuery, sql as SQL } from 'sql'

const createQueryConfig = (sqlNode: SqlNode): QueryConfig => {
  const { text, params } = buildSqlQuery(sqlNode)
  return { text, values: params }
}

const createQueryArrayConfig = (sqlNode: SqlNode): QueryArrayConfig => {
  const { text, params } = buildSqlQuery(sqlNode)
  return { text, values: params, rowMode: 'array' }
}

export default class Connection {
  public constructor(pgpool: Pool) {
    this._pgpool = pgpool
  }

  public async open() {
    if (this._pgclient) {
      throw new Error('Already open')
    }

    this._pgclient = await this._pgpool.connect()
  }

  public async close(error?: Error | true) {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    this._pgclient.release(<Error>error)
    delete this._pgclient
  }

  public async command(sql: SqlNode): Promise<void> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    const query = createQueryArrayConfig(sql)
    await this._pgclient.query(query)
  }

  public async query<TRow = any>(sql: SqlNode): Promise<TRow[]> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    const query = createQueryConfig(sql)
    const result = await this._pgclient.query(query)
    return <TRow[]>result.rows
  }

  public async scalars<TItem = any>(sql: SqlNode): Promise<TItem[]> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    const query = createQueryArrayConfig(sql)
    const result = await this._pgclient.query(query)
    return result.rows.map(x => <TItem>x[0])
  }

  public async first<TRow = any>(sql: SqlNode): Promise<TRow> {
    const rows = await this.query(sql)
    return rows[0]
  }

  public async scalar<TResult = any>(sql: SqlNode): Promise<TResult> {
    if (!this._pgclient) {
      throw new Error('Not open')
    }

    const query = createQueryArrayConfig(sql)
    const result = await this._pgclient.query(query)
    return <TResult>result.rows[0][0]
  }

  public async beginTransaction() {
    if (this._transaction) {
      throw new Error('Already in transaction')
    }

    await this.command(SQL`BEGIN`)
    this._transaction = new Transaction(this)
    return this._transaction
  }

  public onTransactionEnd(transaction: Transaction) {
    if (transaction === this._transaction) {
      delete this._transaction
    } else {
      throw new Error('Transaction tracking failure')
    }
  }

  private readonly _pgpool: Pool
  private _pgclient?: PoolClient
  private _transaction?: Transaction
}
