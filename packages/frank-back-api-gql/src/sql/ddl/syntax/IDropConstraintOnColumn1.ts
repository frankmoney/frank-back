import Identifier from '../Identifier'
import TableName from '../TableName'
import IDropConstraintOnColumnUnique1 from './IDropConstraintOnColumnPrimaryKey1'
import IDropConstraintOnColumnPrimaryKey1 from './IDropConstraintOnColumnPrimaryKey1'

/* tslint:disable:unified-signatures */
export default interface IDropConstraintOnColumn1<
  TTableName extends TableName
> {
  column(column: string): IDropConstraintOnColumn1<TTableName>
  column(column: Identifier): IDropConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string
  ): IDropConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier
  ): IDropConstraintOnColumn1<TTableName>

  primaryKey(): IDropConstraintOnColumnPrimaryKey1<TTableName>
  unique(): IDropConstraintOnColumnUnique1<TTableName>
}
