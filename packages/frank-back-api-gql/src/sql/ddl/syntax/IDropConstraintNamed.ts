import TableName from '../TableName'
import IDropConstraintNamedOn0 from './IDropConstraintNamedOn0'
import IDropConstraintNamedOn1 from './IDropConstraintNamedOn1'

export default interface IDropConstraintNamed {
  on(table: string): IDropConstraintNamedOn0
  on<TTableName extends TableName>(
    table: TTableName
  ): IDropConstraintNamedOn1<TTableName>
}
