import Database from 'store/Database'
import { Sql } from '../../ast'
import Identifier from '../Identifier'
import IExecutable from './IExecutable'
import TableName from '../TableName'

/* tslint:disable:unified-signatures */
export default interface ICreateTableColumn1<TTableName extends TableName>
  extends IExecutable {
  before(exec: (db: Database) => Promise<void>): ICreateTableColumn1<TTableName>

  after(exec: (db: Database) => Promise<void>): ICreateTableColumn1<TTableName>

  column(name: string, def: string): ICreateTableColumn1<TTableName>
  column(name: string, def: Sql): ICreateTableColumn1<TTableName>

  column(name: Identifier, def: string): ICreateTableColumn1<TTableName>
  column(name: Identifier, def: Sql): ICreateTableColumn1<TTableName>

  column(
    name: (table: TTableName) => string,
    def: string
  ): ICreateTableColumn1<TTableName>
  column(
    name: (table: TTableName) => string,
    def: Sql
  ): ICreateTableColumn1<TTableName>

  column(
    name: (table: TTableName) => Identifier,
    def: string
  ): ICreateTableColumn1<TTableName>
  column(
    name: (table: TTableName) => Identifier,
    def: Sql
  ): ICreateTableColumn1<TTableName>
}
