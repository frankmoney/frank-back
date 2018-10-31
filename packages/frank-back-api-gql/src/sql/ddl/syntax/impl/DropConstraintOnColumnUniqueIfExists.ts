import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropConstraintOnColumnUniqueIfExists0 from '../IDropConstraintOnColumnUniqueIfExists0'
import IDropConstraintOnColumnUniqueIfExists1 from '../IDropConstraintOnColumnUniqueIfExists1'

export default class DropConstraintOnColumnUniqueIfExists
  implements
    IDropConstraintOnColumnUniqueIfExists0,
    IDropConstraintOnColumnUniqueIfExists1<any> {
  public constructor(table: any, columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database): Promise<any> {
    const columns = this._columns.map(x => `${x}`)

    const name = `uq:${this._table}(${columns.join(',')})`

    await db.command(sql`
      alter table "${raw(this._table)}"
      drop constraint if exists "${raw(name)}";
    `)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
