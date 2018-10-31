import { Sql } from '../../ast'
import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateConstraintOnColumn1 from './ICreateConstraintOnColumn1'

/* tslint:disable:unified-signatures */
export default interface ICreateConstraintOn1<TTableName extends TableName> {
  column(column: string): ICreateConstraintOnColumn1<TTableName>
  column(
    column: string,
    extensions: string
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: string,
    extensions: Sql
  ): ICreateConstraintOnColumn1<TTableName>

  column(column: Identifier): ICreateConstraintOnColumn1<TTableName>
  column(
    column: Identifier,
    extensions: string
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: Identifier,
    extensions: Sql
  ): ICreateConstraintOnColumn1<TTableName>

  column(
    column: (table: TTableName) => string
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string,
    extensions: string
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string,
    extensions: Sql
  ): ICreateConstraintOnColumn1<TTableName>

  column(
    column: (table: TTableName) => Identifier
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier,
    extensions: string
  ): ICreateConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier,
    extensions: Sql
  ): ICreateConstraintOnColumn1<TTableName>
}
