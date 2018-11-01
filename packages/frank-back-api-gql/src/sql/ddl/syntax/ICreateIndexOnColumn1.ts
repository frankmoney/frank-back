import { Sql } from '../../ast'
import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateIndexOnColumnUnique1 from './ICreateIndexOnColumnUnique1'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateIndexOnColumn1<TTableName extends TableName>
  extends IExecutable {
  column(column: string): ICreateIndexOnColumn1<TTableName>
  column(column: string, extensions: string): ICreateIndexOnColumn1<TTableName>
  column(column: string, extensions: Sql): ICreateIndexOnColumn1<TTableName>

  column(column: Identifier): ICreateIndexOnColumn1<TTableName>
  column(
    column: Identifier,
    extensions: string
  ): ICreateIndexOnColumn1<TTableName>
  column(column: Identifier, extensions: Sql): ICreateIndexOnColumn1<TTableName>

  column(
    column: (table: TTableName) => string
  ): ICreateIndexOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string,
    extensions: string
  ): ICreateIndexOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string,
    extensions: Sql
  ): ICreateIndexOnColumn1<TTableName>

  column(
    column: (table: TTableName) => Identifier
  ): ICreateIndexOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier,
    extensions: string
  ): ICreateIndexOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier,
    extensions: Sql
  ): ICreateIndexOnColumn1<TTableName>

  unique(): ICreateIndexOnColumnUnique1<TTableName>
}
