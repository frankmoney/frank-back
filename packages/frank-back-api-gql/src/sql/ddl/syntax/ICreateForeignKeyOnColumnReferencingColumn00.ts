import Identifier from '../Identifier'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencingColumn00
  extends IExecutable {
  column(column: string): ICreateForeignKeyOnColumnReferencingColumn00
  column(column: Identifier): ICreateForeignKeyOnColumnReferencingColumn00
}
