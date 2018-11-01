import TableName from '../TableName'
import ICreateConstraintOn0 from './ICreateConstraintOn0'
import ICreateConstraintOn1 from './ICreateConstraintOn1'

export default interface ICreateConstraint {
  on(table: string): ICreateConstraintOn0
  on<TTableName extends TableName>(
    table: TTableName
  ): ICreateConstraintOn1<TTableName>
}
