import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateSequence from '../ICreateSequence'

export default class CreateSequence implements ICreateSequence {
  public constructor(name: any) {
    this._name = name
  }

  public async exec(db: Database): Promise<void> {
    await db.command(sql`
      create sequence "${raw(this._name)}";
    `)
  }

  private readonly _name: any
}
