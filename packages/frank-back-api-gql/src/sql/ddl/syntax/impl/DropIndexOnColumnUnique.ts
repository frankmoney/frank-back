import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropIndexOnColumnUnique0 from '../IDropIndexOnColumnUnique0'
import IDropIndexOnColumnUnique1 from '../IDropIndexOnColumnUnique1'

export default class DropIndexOnColumnUnique
  implements IDropIndexOnColumnUnique0, IDropIndexOnColumnUnique1<any> {
  public constructor(table: any, ...columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database): Promise<void> {
    const columns = this._columns.map(x => `${x}`)

    const name = `ux:${this._table}(${columns.join(',')})`

    await db.command(sql`
      drop index "${raw(name)}";
    `)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
