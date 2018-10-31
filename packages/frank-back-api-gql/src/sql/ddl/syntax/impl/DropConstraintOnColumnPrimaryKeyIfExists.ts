import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropConstraintOnColumnPrimaryKeyIfExists0 from '../IDropConstraintOnColumnPrimaryKeyIfExists0'
import IDropConstraintOnColumnPrimaryKeyIfExists1 from '../IDropConstraintOnColumnPrimaryKeyIfExists1'

export default class DropConstraintOnColumnPrimaryKeyIfExists
  implements
    IDropConstraintOnColumnPrimaryKeyIfExists0,
    IDropConstraintOnColumnPrimaryKeyIfExists1<any> {
  public constructor(table: any, columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database): Promise<any> {
    const columns = this._columns.map(x => `${x}`)

    const name = `pk:${this._table}(${columns.join(',')})`

    await db.command(sql`
      alter table "${raw(this._table)}"
      drop constraint if exists "${raw(name)}";
    `)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
