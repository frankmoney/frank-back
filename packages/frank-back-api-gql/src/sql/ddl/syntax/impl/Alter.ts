import IAlter from '../IAlter'
import AlterSequence from './AlterSequence'
import AlterTable from './AlterTable'

export default class Alter implements IAlter {
  public sequence(name: any): any {
    return new AlterSequence(name)
  }

  public table(name: any): any {
    return new AlterTable(name)
  }
}
