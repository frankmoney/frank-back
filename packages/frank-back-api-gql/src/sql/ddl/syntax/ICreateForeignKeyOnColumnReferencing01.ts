import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumnReferencingColumn01 from './ICreateForeignKeyOnColumnReferencingColumn01'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencing01<
  TForeignTableName extends TableName
> {
  column(
    column: string
  ): ICreateForeignKeyOnColumnReferencingColumn01<TForeignTableName>
  column(
    column: Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn01<TForeignTableName>
  column(
    column: (table: TForeignTableName) => string
  ): ICreateForeignKeyOnColumnReferencingColumn01<TForeignTableName>
  column(
    column: (table: TForeignTableName) => Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn01<TForeignTableName>
}
