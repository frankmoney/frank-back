import Identifier from '../Identifier'
import TableName from '../TableName'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencingColumn10<
  TTableName extends TableName
> extends IExecutable {
  column(
    column: string
  ): ICreateForeignKeyOnColumnReferencingColumn10<TTableName>
  column(
    column: Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn10<TTableName>
}
