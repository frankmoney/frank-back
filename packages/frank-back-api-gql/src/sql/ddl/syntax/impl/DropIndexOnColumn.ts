import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropIndexOnColumn0 from '../IDropIndexOnColumn0'
import IDropIndexOnColumn1 from '../IDropIndexOnColumn1'
import DropIndexOnColumnUnique from './DropIndexOnColumnUnique'

export default class DropIndexOnColumn
  implements IDropIndexOnColumn0, IDropIndexOnColumn1<any> {
  public constructor(table: any, ...columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public column(column: any): any {
    return new DropIndexOnColumn(
      this._table,
      ...this._columns,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  public unique(): any {
    return new DropIndexOnColumnUnique(this._table, ...this._columns)
  }

  public async exec(db: Database): Promise<void> {
    const columns = this._columns.map(x => `${x}`)

    const name = `ix:${this._table}(${columns.join(',')})`

    await db.command(sql`
      drop index "${raw(name)}";
    `)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
