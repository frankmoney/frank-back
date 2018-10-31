import IAlterTable0 from '../IAlterTable0'
import IAlterTable1 from '../IAlterTable1'
import AlterTableAlterColumn from './AlterTableAlterColumn'

export default class AlterTable implements IAlterTable0, IAlterTable1<any> {
  public constructor(name: any) {
    this._name = name
  }

  public alterColumn(column: any, def: any): any {
    return new AlterTableAlterColumn(
      this._name,
      typeof column === 'function' ? column(this._name) : column,
      def
    )
  }

  private readonly _name: any
}
