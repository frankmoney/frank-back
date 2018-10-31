import ICreateConstraint from '../ICreateConstraint'
import CreateConstraintOn from './CreateConstraintOn'

export default class CreateConstraint implements ICreateConstraint {
  public constructor(name: any) {
    this._name = name
  }

  public on(table: any): any {
    return new CreateConstraintOn(this._name, table)
  }

  private readonly _name: any
}
