import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateConstraintOnColumnUnique0 from '../ICreateConstraintOnColumnUnique0'
import ICreateConstraintOnColumnUnique1 from '../ICreateConstraintOnColumnUnique1'

export default class CreateConstraintOnColumnUnique
  implements
    ICreateConstraintOnColumnUnique0,
    ICreateConstraintOnColumnUnique1<any> {
  public constructor(name: any, table: any, columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database) {
    const columns = this._columns.map(x => `${x}`)

    const name = this._name || `uq:${this._table}(${columns.join(',')})`

    const columnsSql = raw(columns.map(x => `"${x}"`).join(', '))

    await db.command(sql`
      alter table "${raw(this._table)}"
      add constraint "${raw(name)}"
      unique ( ${columnsSql} );
    `)
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
