import ICreateForeignKeyOnColumn0 from '../ICreateForeignKeyOnColumn0'
import ICreateForeignKeyOnColumn1 from '../ICreateForeignKeyOnColumn1'
import CreateForeignKeyOnColumnReferencing from './CreateForeignKeyOnColumnReferencing'

export default class CreateForeignKeyOnColumn
  implements ICreateForeignKeyOnColumn0, ICreateForeignKeyOnColumn1<any> {
  public constructor(name: any, table: any, ...columns: any[]) {
    this._name = name
    this._table = table
    this._columns = columns
  }

  public column(column: any): any {
    return new CreateForeignKeyOnColumn(
      this._name,
      this._table,
      ...this._columns,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  public to(table: any): any {
    return this.referencing(table)
  }

  public referencing(table: any): any {
    return new CreateForeignKeyOnColumnReferencing(
      this._name,
      this._table,
      this._columns,
      table
    )
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
}
