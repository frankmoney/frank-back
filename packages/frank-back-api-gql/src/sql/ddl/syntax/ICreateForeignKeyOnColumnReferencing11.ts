import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumnReferencingColumn11 from './ICreateForeignKeyOnColumnReferencingColumn11'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencing11<
  TTableName extends TableName,
  TForeignTableName extends TableName
> {
  column(
    column: string
  ): ICreateForeignKeyOnColumnReferencingColumn11<TTableName, TForeignTableName>
  column(
    column: Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn11<TTableName, TForeignTableName>
  column(
    column: (table: TForeignTableName) => string
  ): ICreateForeignKeyOnColumnReferencingColumn11<TTableName, TForeignTableName>
  column(
    column: (table: TForeignTableName) => Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn11<TTableName, TForeignTableName>
}
