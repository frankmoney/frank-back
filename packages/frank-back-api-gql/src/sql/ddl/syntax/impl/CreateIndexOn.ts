import ICreateIndexOn0 from '../ICreateIndexOn0'
import ICreateIndexOn1 from '../ICreateIndexOn1'
import CreateIndexOnColumn from './CreateIndexOnColumn'

export default class CreateIndexOn
  implements ICreateIndexOn0, ICreateIndexOn1<any> {
  public constructor(name: any, table: any) {
    this._name = name
    this._table = table
  }

  public column(column: any): any {
    return new CreateIndexOnColumn(
      this._name,
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  private readonly _name: any
  private readonly _table: any
}
