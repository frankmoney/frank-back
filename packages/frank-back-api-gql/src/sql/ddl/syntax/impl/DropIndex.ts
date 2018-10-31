import IDropIndex from '../IDropIndex'
import DropIndexOn from './DropIndexOn'

export default class DropIndex implements IDropIndex {
  public on(table: any): any {
    return new DropIndexOn(table)
  }
}
