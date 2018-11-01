import { Sql } from '../../ast'
import Identifier from '../Identifier'
import TableName from '../TableName'
import IAlterTableAddColumn1 from './IAlterTableAddColumn1'
import IAlterTableAlterColumn1 from './IAlterTableAlterColumn1'
import IAlterTableDropColumn1 from './IAlterTableDropColumn1'

/* tslint:disable:unified-signatures */
export default interface IAlterTable1<TTableName extends TableName> {
  addColumn(column: string, def: string): IAlterTableAddColumn1<TTableName>
  addColumn(column: string, def: Sql): IAlterTableAddColumn1<TTableName>

  addColumn(column: Identifier, def: string): IAlterTableAddColumn1<TTableName>
  addColumn(column: Identifier, def: Sql): IAlterTableAddColumn1<TTableName>

  addColumn(
    column: (table: TTableName) => string,
    def: string
  ): IAlterTableAddColumn1<TTableName>
  addColumn(
    column: (table: TTableName) => string,
    def: Sql
  ): IAlterTableAddColumn1<TTableName>

  addColumn(
    column: (table: TTableName) => Identifier,
    def: string
  ): IAlterTableAddColumn1<TTableName>
  addColumn(
    column: (table: TTableName) => Identifier,
    def: Sql
  ): IAlterTableAddColumn1<TTableName>

  alterColumn(column: string, def: string): IAlterTableAlterColumn1<TTableName>
  alterColumn(column: string, def: Sql): IAlterTableAlterColumn1<TTableName>

  alterColumn(
    column: Identifier,
    def: string
  ): IAlterTableAlterColumn1<TTableName>
  alterColumn(column: Identifier, def: Sql): IAlterTableAlterColumn1<TTableName>

  alterColumn(
    column: (table: TTableName) => string,
    def: string
  ): IAlterTableAlterColumn1<TTableName>
  alterColumn(
    column: (table: TTableName) => string,
    def: Sql
  ): IAlterTableAlterColumn1<TTableName>

  alterColumn(
    column: (table: TTableName) => Identifier,
    def: string
  ): IAlterTableAlterColumn1<TTableName>
  alterColumn(
    column: (table: TTableName) => Identifier,
    def: Sql
  ): IAlterTableAlterColumn1<TTableName>

  dropColumn(column: string): IAlterTableDropColumn1<TTableName>
  dropColumn(column: Identifier): IAlterTableDropColumn1<TTableName>
  dropColumn(
    column: (table: TTableName) => string
  ): IAlterTableDropColumn1<TTableName>
  dropColumn(
    column: (table: TTableName) => Identifier
  ): IAlterTableDropColumn1<TTableName>
}
