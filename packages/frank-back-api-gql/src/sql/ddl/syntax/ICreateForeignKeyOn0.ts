import Identifier from '../Identifier'
import ICreateForeignKeyOnColumn0 from './ICreateForeignKeyOnColumn0'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOn0 {
  column(column: string): ICreateForeignKeyOnColumn0
  column(column: Identifier): ICreateForeignKeyOnColumn0
}
