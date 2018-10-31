import IAlterSequence from '../IAlterSequence'
import AlterSequenceOwnedBy from './AlterSequenceOwnedBy'

export default class AlterSequence implements IAlterSequence {
  public constructor(name: any) {
    this._name = name
  }

  public ownedBy(table: any, column: any): any {
    return new AlterSequenceOwnedBy(
      this._name,
      table,
      typeof column === 'function' ? column(table) : column
    )
  }

  private readonly _name: any
}
