import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumnReferencing10 from './ICreateForeignKeyOnColumnReferencing10'
import ICreateForeignKeyOnColumnReferencing11 from './ICreateForeignKeyOnColumnReferencing11'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumn1<
  TTableName extends TableName
> {
  column(column: string): ICreateForeignKeyOnColumn1<TTableName>
  column(column: Identifier): ICreateForeignKeyOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string
  ): ICreateForeignKeyOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier
  ): ICreateForeignKeyOnColumn1<TTableName>

  referencing(table: string): ICreateForeignKeyOnColumnReferencing10<TTableName>
  referencing<TForeignTableName extends TableName>(
    table: TForeignTableName
  ): ICreateForeignKeyOnColumnReferencing11<TTableName, TForeignTableName>

  to(table: string): ICreateForeignKeyOnColumnReferencing10<TTableName>
  to<TForeignTableName extends TableName>(
    table: TForeignTableName
  ): ICreateForeignKeyOnColumnReferencing11<TTableName, TForeignTableName>
}
