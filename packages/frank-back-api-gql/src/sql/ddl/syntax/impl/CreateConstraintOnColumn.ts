import ICreateConstraintOnColumn0 from '../ICreateConstraintOnColumn0'
import ICreateConstraintOnColumn1 from '../ICreateConstraintOnColumn1'
import CreateConstraintOnColumnPrimaryKey from './CreateConstraintOnColumnPrimaryKey'
import CreateConstraintOnColumnUnique from './CreateConstraintOnColumnUnique'

export default class CreateConstraintOnColumn
  implements ICreateConstraintOnColumn0, ICreateConstraintOnColumn1<any> {
  public constructor(name: any, table: any, ...columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public column(column: any): any {
    return new CreateConstraintOnColumn(
      this._name,
      this._table,
      ...this._columns,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  public primaryKey(): any {
    return new CreateConstraintOnColumnPrimaryKey(
      this._name,
      this._table,
      this._columns
    )
  }

  public unique(): any {
    return new CreateConstraintOnColumnUnique(
      this._name,
      this._table,
      this._columns
    )
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
