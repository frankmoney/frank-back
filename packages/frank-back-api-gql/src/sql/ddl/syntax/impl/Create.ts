import ICreate from '../ICreate'
import CreateConstraint from './CreateConstraint'
import CreateForeignKey from './CreateForeignKey'
import CreateIndex from './CreateIndex'
import CreateSequence from './CreateSequence'
import CreateTable from './CreateTable'

export default class Create implements ICreate {
  public constraint(name?: any): any {
    return new CreateConstraint(name)
  }

  public foreignKey(name?: any): any {
    return new CreateForeignKey(name)
  }

  public index(name?: any): any {
    return new CreateIndex(name)
  }

  public sequence(name: any): any {
    return new CreateSequence(name)
  }

  public table(name: any): any {
    return new CreateTable(name)
  }
}
