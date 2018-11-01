import IDropConstraintOn0 from '../IDropConstraintOn0'
import IDropConstraintOn1 from '../IDropConstraintOn1'
import DropConstraintOnColumn from './DropConstraintOnColumn'

export default class DropConstraintOn
  implements IDropConstraintOn0, IDropConstraintOn1<any> {
  public constructor(table: any) {
    this._table = table
  }

  public column(column: any): any {
    return new DropConstraintOnColumn(
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  private readonly _table: any
}
