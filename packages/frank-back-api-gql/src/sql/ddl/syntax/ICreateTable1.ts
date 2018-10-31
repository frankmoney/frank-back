import Database from 'store/Database'
import Sql from '../../ast/Sql'
import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateTableColumn1 from './ICreateTableColumn1'

/* tslint:disable:unified-signatures */
export default interface ICreateTable1<TTableName extends TableName> {
  before(exec: (db: Database) => Promise<void>): ICreateTable1<TTableName>

  after(exec: (db: Database) => Promise<void>): ICreateTable1<TTableName>

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
