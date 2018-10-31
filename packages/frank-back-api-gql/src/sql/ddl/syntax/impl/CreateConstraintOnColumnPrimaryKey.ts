import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateConstraintOnColumnPrimaryKey0 from '../ICreateConstraintOnColumnPrimaryKey0'
import ICreateConstraintOnColumnPrimaryKey1 from '../ICreateConstraintOnColumnPrimaryKey1'

export default class CreateConstraintOnColumnPrimaryKey
  implements
    ICreateConstraintOnColumnPrimaryKey0,
    ICreateConstraintOnColumnPrimaryKey1<any> {
  public constructor(name: any, table: any, columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public async exec(db: Database) {
    const columns = this._columns.map(x => `${x}`)

    const name = this._name || `pk:${this._table}(${columns.join(',')})`

    const columnsSql = raw(columns.map(x => `"${x}"`).join(', '))

    await db.command(sql`
      alter table "${raw(this._table)}"
      add constraint "${raw(name)}"
      primary key ( ${columnsSql} );
    `)
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
