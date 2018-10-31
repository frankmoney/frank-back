import IAlterTable0 from '../IAlterTable0'
import IAlterTable1 from '../IAlterTable1'
import AlterTableAddColumn from './AlterTableAddColumn'
import AlterTableAlterColumn from './AlterTableAlterColumn'
import AlterTableDropColumn from './AlterTableDropColumn'

export default class AlterTable implements IAlterTable0, IAlterTable1<any> {
  public constructor(name: any) {
    this._name = name
  }

  public addColumn(column: any, def: any): any {
    return new AlterTableAddColumn(
      this._name,
      typeof column === 'function' ? column(this._name) : column,
      def
    )
  }

  public alterColumn(column: any, def: any): any {
    return new AlterTableAlterColumn(
      this._name,
      typeof column === 'function' ? column(this._name) : column,
      def
    )
  }

  public dropColumn(column: any): any {
    return new AlterTableDropColumn(
      this._name,
      typeof column === 'function' ? column(this._name) : column
    )
  }

  private readonly _name: any
}
