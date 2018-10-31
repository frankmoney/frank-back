import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IAlterTableDropColumn0 from '../IAlterTableDropColumn0'
import IAlterTableDropColumn1 from '../IAlterTableDropColumn1'

export default class AlterTableDropColumn
  implements IAlterTableDropColumn0, IAlterTableDropColumn1<any> {
  public constructor(table: any, column: any) {
    this._table = table
    this._column = column
  }

  public async exec(db: Database): Promise<void> {
    await db.command(sql`
      alter table "${raw(this._table)}"
      drop column "${raw(this._column)}";
    `)
  }

  private readonly _table: any
  private readonly _column: any
}
