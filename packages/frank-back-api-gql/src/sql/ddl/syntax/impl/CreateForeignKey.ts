import ICreateForeignKey from '../ICreateForeignKey'
import CreateForeignKeyOn from './CreateForeignKeyOn'

export default class CreateForeignKey implements ICreateForeignKey {
  public constructor(name: any) {
    this._name = name
  }

  public on(table: any): any {
    return new CreateForeignKeyOn(this._name, table)
  }

  private readonly _name: any
}
