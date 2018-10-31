import ICreateConstraintOn0 from '../ICreateConstraintOn0'
import ICreateConstraintOn1 from '../ICreateConstraintOn1'
import CreateConstraintOnColumn from './CreateConstraintOnColumn'

export default class CreateConstraintOn
  implements ICreateConstraintOn0, ICreateConstraintOn1<any> {
  public constructor(name: any, table: any) {
    this._name = name
    this._table = table
  }

  public column(column: any): any {
    return new CreateConstraintOnColumn(
      this._name,
      this._table,
      typeof column === 'function' ? column(this._table) : column
    )
  }

  private readonly _name: any
  private readonly _table: any
}
