import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropConstraintNamedOn0 from '../IDropConstraintNamedOn0'
import IDropConstraintNamedOn1 from '../IDropConstraintNamedOn1'
import DropConstraintNamedOnIfExists from './DropConstraintNamedOnIfExists'

export default class DropConstraintNamedOn
  implements IDropConstraintNamedOn0, IDropConstraintNamedOn1<any> {
  public constructor(name: any, table: any) {
    this._name = name
    this._table = table
  }

  public ifExists(): any {
    return new DropConstraintNamedOnIfExists(this._name, this._table)
  }

  public async exec(db: Database) {
    await db.command(sql`
      alter table "${raw(this._table)}"
      drop constraint "${raw(this._name)}";
    `)
  }

  private readonly _name: any
  private readonly _table: any
}
