import TableName from '../TableName'
import IDropConstraintOn0 from './IDropConstraintOn0'
import IDropConstraintOn1 from './IDropConstraintOn1'

export default interface IDropConstraint {
  on(table: string): IDropConstraintOn0
  on<TTableName extends TableName>(
    table: TTableName
  ): IDropConstraintOn1<TTableName>
}
