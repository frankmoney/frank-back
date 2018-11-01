import ICreateIndex from '../ICreateIndex'
import CreateIndexOn from './CreateIndexOn'

export default class CreateIndex implements ICreateIndex {
  public constructor(name: any) {
    this._name = name
  }

  public on(table: any): any {
    return new CreateIndexOn(this._name, table)
  }

  private readonly _name: any
}
