import { Sql } from '../../ast'
import Identifier from '../Identifier'
import ICreateIndexOnColumnUnique0 from './ICreateIndexOnColumnUnique0'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateIndexOnColumn0 extends IExecutable {
  column(column: string): ICreateIndexOnColumn0
  column(column: string, extensions: string): ICreateIndexOnColumn0
  column(column: string, extensions: Sql): ICreateIndexOnColumn0

  column(column: Identifier): ICreateIndexOnColumn0
  column(column: Identifier, extensions: string): ICreateIndexOnColumn0
  column(column: Identifier, extensions: Sql): ICreateIndexOnColumn0

  unique(): ICreateIndexOnColumnUnique0
}
