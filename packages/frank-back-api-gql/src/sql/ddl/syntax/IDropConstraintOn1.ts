import Identifier from '../Identifier'
import TableName from '../TableName'
import IDropConstraintOnColumn1 from './IDropConstraintOnColumn1'

/* tslint:disable:unified-signatures */
export default interface IDropConstraintOn1<TTableName extends TableName> {
  column(column: string): IDropConstraintOnColumn1<TTableName>
  column(column: Identifier): IDropConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => string
  ): IDropConstraintOnColumn1<TTableName>
  column(
    column: (table: TTableName) => Identifier
  ): IDropConstraintOnColumn1<TTableName>
}
