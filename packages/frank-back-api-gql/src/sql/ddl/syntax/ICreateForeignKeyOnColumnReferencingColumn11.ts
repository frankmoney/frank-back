import Identifier from '../Identifier'
import TableName from '../TableName'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencingColumn11<
  TTableName extends TableName,
  TForeignTableName extends TableName
> extends IExecutable {
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
