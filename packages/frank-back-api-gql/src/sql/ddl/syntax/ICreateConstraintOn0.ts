import { Sql } from '../../ast'
import Identifier from '../Identifier'
import ICreateConstraintOnColumn0 from './ICreateConstraintOnColumn0'

/* tslint:disable:unified-signatures */
export default interface ICreateConstraintOn0 {
  column(column: string): ICreateConstraintOnColumn0
  column(column: string, extensions: string): ICreateConstraintOnColumn0
  column(column: string, extensions: Sql): ICreateConstraintOnColumn0

  column(column: Identifier): ICreateConstraintOnColumn0
  column(column: Identifier, extensions: string): ICreateConstraintOnColumn0
  column(column: Identifier, extensions: Sql): ICreateConstraintOnColumn0
}
