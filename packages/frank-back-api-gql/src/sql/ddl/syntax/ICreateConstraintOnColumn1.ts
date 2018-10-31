import { Sql } from '../../ast'
import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateConstraintOnColumnPrimaryKey1 from './ICreateConstraintOnColumnPrimaryKey1'
import ICreateConstraintOnColumnUnique1 from './ICreateConstraintOnColumnUnique1'

/* tslint:disable:unified-signatures */
export default interface ICreateConstraintOnColumn1<
  TTableName extends TableName
> {
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

  primaryKey(): ICreateConstraintOnColumnPrimaryKey1<TTableName>
  unique(): ICreateConstraintOnColumnUnique1<TTableName>
}
