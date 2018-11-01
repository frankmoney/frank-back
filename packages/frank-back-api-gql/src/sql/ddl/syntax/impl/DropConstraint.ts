import IDropConstraint from '../IDropConstraint'
import DropConstraintOn from './DropConstraintOn'

export default class DropConstraint implements IDropConstraint {
  public on(table: any): any {
    return new DropConstraintOn(table)
  }
}
