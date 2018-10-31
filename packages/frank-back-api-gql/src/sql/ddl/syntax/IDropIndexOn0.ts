import Identifier from '../Identifier'
import IDropIndexOnColumn0 from './IDropIndexOnColumn0'

/* tslint:disable:unified-signatures */
export default interface IDropIndexOn0 {
  column(name: string): IDropIndexOnColumn0
  column(name: Identifier): IDropIndexOnColumn0
}
