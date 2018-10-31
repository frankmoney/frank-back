import IDropConstraintNamed from '../IDropConstraintNamed'
import DropConstraintNamedOn from './DropConstraintNamedOn'

export default class DropConstraintNamed implements IDropConstraintNamed {
  public constructor(name: any) {
    this._name = name
  }

  public on(table: any): any {
    return new DropConstraintNamedOn(this._name, table)
  }

  private readonly _name: any
}
