import { Sql } from '../../ast'
import Identifier from '../Identifier'
import ICreateConstraintOnColumnPrimaryKey0 from './ICreateConstraintOnColumnPrimaryKey0'
import ICreateConstraintOnColumnUnique0 from './ICreateConstraintOnColumnUnique0'

/* tslint:disable:unified-signatures */
export default interface ICreateConstraintOnColumn0 {
  column(column: string): ICreateConstraintOnColumn0
  column(column: string, extensions: string): ICreateConstraintOnColumn0
  column(column: string, extensions: Sql): ICreateConstraintOnColumn0

  column(column: Identifier): ICreateConstraintOnColumn0
  column(column: Identifier, extensions: string): ICreateConstraintOnColumn0
  column(column: Identifier, extensions: Sql): ICreateConstraintOnColumn0

  primaryKey(): ICreateConstraintOnColumnPrimaryKey0
  unique(): ICreateConstraintOnColumnUnique0
}
