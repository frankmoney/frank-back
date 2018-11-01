import ICreateForeignKeyOn0 from '../ICreateForeignKeyOn0'
import ICreateForeignKeyOn1 from '../ICreateForeignKeyOn1'
import CreateForeignKeyOnColumn from './CreateForeignKeyOnColumn'

export default class CreateForeignKeyOn
  implements ICreateForeignKeyOn0, ICreateForeignKeyOn1<any> {
  public constructor(name: any, table: any) {
    this._name = name
    this._table = table
  }

  public column(column: any): any {
    return new CreateForeignKeyOnColumn(
      this._name,
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  private readonly _name: any
  private readonly _table: any
}
