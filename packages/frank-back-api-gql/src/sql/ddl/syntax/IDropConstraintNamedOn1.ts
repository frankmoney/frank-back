import TableName from '../TableName'
import IDropConstraintNamedOnIfExists1 from './IDropConstraintNamedOnIfExists1'
import IExecutable from './IExecutable'

export default interface IDropConstraintNamedOn1<TTableName extends TableName>
  extends IExecutable {
  ifExists(): IDropConstraintNamedOnIfExists1<TTableName>
}
