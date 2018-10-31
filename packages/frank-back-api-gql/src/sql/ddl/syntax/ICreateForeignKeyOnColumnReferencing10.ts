import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateForeignKeyOnColumnReferencingColumn10 from './ICreateForeignKeyOnColumnReferencingColumn10'

/* tslint:disable:unified-signatures */
export default interface ICreateForeignKeyOnColumnReferencing10<
  TTableName extends TableName
> {
  column(
    column: string
  ): ICreateForeignKeyOnColumnReferencingColumn10<TTableName>
  column(
    column: Identifier
  ): ICreateForeignKeyOnColumnReferencingColumn10<TTableName>
}
