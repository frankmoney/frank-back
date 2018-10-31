import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateIndexOnColumn0 from '../ICreateIndexOnColumn0'
import ICreateIndexOnColumn1 from '../ICreateIndexOnColumn1'
import CreateIndexOnColumnUnique from './CreateIndexOnColumnUnique'

export default class CreateIndexOnColumn
  implements ICreateIndexOnColumn0, ICreateIndexOnColumn1<any> {
  public constructor(name: any, table: any, ...columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public column(column: any): any {
    return new CreateIndexOnColumn(
      this._name,
      this._table,
      ...this._columns,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  public unique() {
    return new CreateIndexOnColumnUnique(
      this._name,
      this._table,
      ...this._columns
    )
  }

  public async exec(db: Database): Promise<void> {
    const columns = this._columns.map(x => `${x}`)

    const name = this._name || `ix:${this._table}(${columns.join(',')})`

    const columnsSql = raw(columns.map(x => `"${x}"`).join(', '))

    await db.command(sql`
      create index "${raw(name)}"
      on "${raw(this._table)}" ( ${columnsSql} );
    `)
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
