import { SqlNode, sql as SQL } from 'sql'
import Connection from './Connection'

export default class Transaction {
  public constructor(connection: Connection) {
    this._connection = connection
  }

  public async commit() {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    await this.command(SQL`COMMIT`)
    this._connection.onTransactionEnd(this)
    delete this._connection
  }

  public async rollback() {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    await this.command(SQL`ROLLBACK`)
    this._connection.onTransactionEnd(this)
    delete this._connection
  }

  public command(sqlNode: SqlNode) {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    return this._connection.command(sqlNode)
  }

  public query<TRow = any>(sqlNode: SqlNode) {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    return this._connection.query<TRow>(sqlNode)
  }

  public first<TRow = any>(sqlNode: SqlNode) {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    return this._connection.first<TRow>(sqlNode)
  }

  public scalar<TResult = any>(sqlNode: SqlNode) {
    if (!this._connection) {
      throw new Error('Already finished')
    }

    return this._connection.scalar<TResult>(sqlNode)
  }

  private _connection?: Connection
}
