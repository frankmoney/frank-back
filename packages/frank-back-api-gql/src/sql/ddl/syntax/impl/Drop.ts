import IDrop from '../IDrop'
import DropConstraint from './DropConstraint'
import DropConstraintNamed from './DropConstraintNamed'
import DropIndex from './DropIndex'
import DropIndexNamed from './DropIndexNamed'
import DropTable from './DropTable'

export default class Drop implements IDrop {
  public constraint(name?: any): any {
    return name ? new DropConstraintNamed(name) : new DropConstraint()
  }

  public index(name?: any): any {
    return name ? new DropIndexNamed(name) : new DropIndex()
  }

  public table(name: any): any {
    return new DropTable(name)
  }
}
