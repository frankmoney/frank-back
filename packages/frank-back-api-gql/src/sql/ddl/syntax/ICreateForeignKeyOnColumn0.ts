import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumnReferencing00 from './ICreateForeignKeyOnColumnReferencing00'
import ICreateForeignKeyOnColumnReferencing01 from './ICreateForeignKeyOnColumnReferencing01'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumn0 {
  column(column: string): ICreateForeignKeyOnColumn0
  column(column: Identifier): ICreateForeignKeyOnColumn0

  referencing(table: string): ICreateForeignKeyOnColumnReferencing00
  referencing<TForeignTableName extends TableName>(
    table: TForeignTableName
  ): ICreateForeignKeyOnColumnReferencing01<TForeignTableName>

  to(table: string): ICreateForeignKeyOnColumnReferencing00
  to<TForeignTableName extends TableName>(
    table: TForeignTableName
  ): ICreateForeignKeyOnColumnReferencing01<TForeignTableName>
}
