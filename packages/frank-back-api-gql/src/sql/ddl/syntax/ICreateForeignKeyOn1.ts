import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumn1 from './ICreateForeignKeyOnColumn1'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOn1<TTableName extends TableName> {
  column(column: string): ICreateForeignKeyOnColumn1<TTableName>
  column(column: Identifier): ICreateForeignKeyOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string
  ): ICreateForeignKeyOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier
  ): ICreateForeignKeyOnColumn1<TTableName>
}
