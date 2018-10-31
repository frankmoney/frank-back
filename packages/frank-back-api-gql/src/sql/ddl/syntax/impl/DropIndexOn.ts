import IDropIndexOn0 from '../IDropIndexOn0'
import IDropIndexOn1 from '../IDropIndexOn1'
import DropIndexOnColumn from './DropIndexOnColumn'

export default class DropIndexOn implements IDropIndexOn0, IDropIndexOn1<any> {
  public constructor(table: any) {
    this._table = table
  }

  public column(column: any): any {
    return new DropIndexOnColumn(
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  private readonly _table: any
}
