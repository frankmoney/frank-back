import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropTable0 from '../IDropTable0'
import IDropTable1 from '../IDropTable1'

export default class DropTable implements IDropTable0, IDropTable1<any> {
  public constructor(name: any) {
    this._name = name
  }

  public async exec(db: Database) {
    await db.command(sql`
      drop table "${raw(this._name)}";
    `)
  }

  private readonly _name: any
}
