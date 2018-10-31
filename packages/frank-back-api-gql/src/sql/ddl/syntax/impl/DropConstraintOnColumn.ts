import IDropConstraintOnColumn0 from '../IDropConstraintOnColumn0'
import IDropConstraintOnColumn1 from '../IDropConstraintOnColumn1'
import DropConstraintOnColumnPrimaryKey from './DropConstraintOnColumnPrimaryKey'
import DropConstraintOnColumnUnique from './DropConstraintOnColumnUnique'

export default class DropConstraintOnColumn
  implements IDropConstraintOnColumn0, IDropConstraintOnColumn1<any> {
  public constructor(table: any, ...columns: any[]) {
    this._table = table
    this._columns = columns
  }

  public column(column: any): any {
    return new DropConstraintOnColumn(
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  public primaryKey(): any {
    return new DropConstraintOnColumnPrimaryKey(this._table, this._columns)
  }

  public unique(): any {
    return new DropConstraintOnColumnUnique(this._table, this._columns)
  }

  private readonly _table: any
  private readonly _columns: any[]
}
