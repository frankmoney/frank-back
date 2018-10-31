import Identifier from '../Identifier'
import IDropConstraintOnColumnPrimaryKey0 from './IDropConstraintOnColumnPrimaryKey0'
import IDropConstraintOnColumnUnique0 from './IDropConstraintOnColumnUnique0'

/* tslint:disable:unified-signatures */
export default interface IDropConstraintOnColumn0 {
  column(column: string): IDropConstraintOnColumn0
  column(column: Identifier): IDropConstraintOnColumn0

  primaryKey(): IDropConstraintOnColumnPrimaryKey0
  unique(): IDropConstraintOnColumnUnique0
}
