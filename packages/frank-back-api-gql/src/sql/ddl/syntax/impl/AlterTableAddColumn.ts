import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IAlterTableAddColumn0 from '../IAlterTableAddColumn0'
import IAlterTableAddColumn1 from '../IAlterTableAddColumn1'

export default class AlterTableAddColumn
  implements IAlterTableAddColumn0, IAlterTableAddColumn1<any> {
  public constructor(table: any, column: any, def: any) {
    this._table = table
    this._column = column
    this._def = def
  }

  public async exec(db: Database): Promise<void> {
    const def = typeof this._def === 'string' ? raw(this._def) : this._def

    await db.command(sql`
      alter table "${raw(this._table)}"
      add "${raw(this._column)}" ${def};
    `)
  }

  private readonly _table: any
  private readonly _column: any
  private readonly _def: any
}
