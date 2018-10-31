import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IAlterTableAlterColumn0 from '../IAlterTableAlterColumn0'
import IAlterTableAlterColumn1 from '../IAlterTableAlterColumn1'

export default class AlterTableAlterColumn
  implements IAlterTableAlterColumn0, IAlterTableAlterColumn1<any> {
  public constructor(table: any, column: any, def: any) {
    this._table = table
    this._column = column
    this._def = def
  }

  public async exec(db: Database): Promise<void> {
    const def = typeof this._def === 'string' ? raw(this._def) : this._def

    await db.command(sql`
      alter table "${raw(this._table)}"
      alter column "${raw(this._column)}" ${def};
    `)
  }

  private readonly _table: any
  private readonly _column: any
  private readonly _def: any
}
