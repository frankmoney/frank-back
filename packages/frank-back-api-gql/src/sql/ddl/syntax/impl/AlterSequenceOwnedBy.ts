import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IAlterSequenceOwnedBy from '../IAlterSequenceOwnedBy'

export default class AlterSequenceOwnedBy implements IAlterSequenceOwnedBy {
  public constructor(name: any, ownedByTable: any, ownedByColumn: any) {
    this._name = name
    this._ownedByTable = ownedByTable
    this._ownedByColumn = ownedByColumn
  }

  public async exec(db: Database): Promise<void> {
    await db.command(sql`
      alter sequence "${raw(this._name)}"
      owned by "${raw(this._ownedByTable)}"."${raw(this._ownedByColumn)}";
    `)
  }

  private readonly _name: any
  private readonly _ownedByTable: any
  private readonly _ownedByColumn: any
}
