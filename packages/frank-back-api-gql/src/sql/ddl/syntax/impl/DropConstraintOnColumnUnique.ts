import Database from 'store/Database'
import { join, raw, sql } from '../../../gen'
import IDropConstraintOnColumnUnique1 from '../IDropConstraintOnColumnPrimaryKey1'
import IDropConstraintOnColumnUnique0 from '../IDropConstraintOnColumnUnique0'
import DropConstraintOnColumnPrimaryKeyIfExists from './DropConstraintOnColumnPrimaryKeyIfExists'

export default class DropConstraintOnColumnUnique
  implements
    IDropConstraintOnColumnUnique0,
    IDropConstraintOnColumnUnique1<any> {
  public constructor(table: any, columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public ifExists(): any {
    return new DropConstraintOnColumnPrimaryKeyIfExists(
      this._table,
      this._columns
    )
  }

  public async exec(db: Database): Promise<any> {
    const columns = this._columns.map(x => `${x}`)

    const name = `uq:${this._table}(${columns.join(',')})`

    await db.command(sql`
      alter table "${raw(this._table)}"
      drop constraint "${raw(name)}";
    `)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
