import { Sql } from '../../ast'
import Identifier from '../Identifier'
import ICreateIndexOnColumn0 from './ICreateIndexOnColumn0'

/* tslint:disable:unified-signatures */
export default interface ICreateIndexOn0 {
  column(column: string): ICreateIndexOnColumn0
  column(column: string, extensions: string): ICreateIndexOnColumn0
  column(column: string, extensions: Sql): ICreateIndexOnColumn0

  column(column: Identifier): ICreateIndexOnColumn0
  column(column: Identifier, extensions: string): ICreateIndexOnColumn0
  column(column: Identifier, extensions: Sql): ICreateIndexOnColumn0
}
