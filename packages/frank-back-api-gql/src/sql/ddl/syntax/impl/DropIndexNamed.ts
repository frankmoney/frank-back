import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import IDropIndexNamed from '../IDropIndexNamed'

export default class DropIndexNamed implements IDropIndexNamed {
  public constructor(name: any) {
    this._name = name
  }

  public async exec(db: Database): Promise<void> {
    await db.command(sql`
      drop index "${raw(this._name)}";
    `)
  }

  private readonly _name: any
}
