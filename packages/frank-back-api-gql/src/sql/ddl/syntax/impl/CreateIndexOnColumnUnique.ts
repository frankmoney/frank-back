import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateIndexOnColumnUnique0 from '../ICreateIndexOnColumnUnique0'
import ICreateIndexOnColumnUnique1 from '../ICreateIndexOnColumnUnique1'

export default class CreateIndexOnColumnUnique
  implements ICreateIndexOnColumnUnique0, ICreateIndexOnColumnUnique1<any> {
  public constructor(name: any, table: any, ...columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database): Promise<void> {
    const columns = this._columns.map(x => `${x}`)

    const name = this._name || `ux:${this._table}(${columns.join(',')})`

    const columnsSql = raw(columns.map(x => `"${x}"`).join(', '))

    await db.command(sql`
      create unique index "${raw(name)}"
      on "${raw(this._table)}" ( ${columnsSql} );
    `)
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
