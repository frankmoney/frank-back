import { Sql } from '../../ast'
import Identifier from '../Identifier'
import TableName from '../TableName'
import IAlterTableAlterColumn1 from './IAlterTableAlterColumn1'

/* tslint:disable:unified-signatures */
export default interface IAlterTable1<TTableName extends TableName> {
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
}
