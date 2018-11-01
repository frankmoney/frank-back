import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropConstraintNamedOnIfExists0 from '../IDropConstraintNamedOnIfExists0'
import IDropConstraintNamedOnIfExists1 from '../IDropConstraintNamedOnIfExists1'

export default class DropConstraintNamedOnIfExists
  implements
    IDropConstraintNamedOnIfExists0,
    IDropConstraintNamedOnIfExists1<any> {
  public constructor(name: any, table: any) {
    this._name = name
    this._table = table
  }

  public async exec(db: Database) {
    await db.command(sql`
      alter table "${raw(this._table)}"
      drop constraint if exists "${raw(this._name)}";
    `)
  }

  private readonly _name: any
  private readonly _table: any
}
