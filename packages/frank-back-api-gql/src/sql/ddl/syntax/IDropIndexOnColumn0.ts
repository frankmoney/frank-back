import Identifier from '../Identifier'
import IDropIndexOnColumnUnique0 from './IDropIndexOnColumnUnique0'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface IDropIndexOnColumn0 extends IExecutable {
  column(name: string): IDropIndexOnColumn0
  column(name: Identifier): IDropIndexOnColumn0

  unique(): IDropIndexOnColumnUnique0
}
