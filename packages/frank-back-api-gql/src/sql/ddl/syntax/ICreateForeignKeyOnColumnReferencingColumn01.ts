import Identifier from '../Identifier'
import TableName from '../TableName'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencingColumn01<
  TForeignTableName extends TableName
> extends IExecutable {
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
