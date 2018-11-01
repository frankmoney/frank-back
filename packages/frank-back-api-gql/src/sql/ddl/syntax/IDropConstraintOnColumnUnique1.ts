import TableName from '../TableName'
import IDropConstraintOnColumnPrimaryKeyIfExists1 from './IDropConstraintOnColumnPrimaryKeyIfExists1'
import IExecutable from './IExecutable'

export default interface IDropConstraintOnColumnPrimaryKey1<
  TTableName extends TableName
> extends IExecutable {
  ifExists(): IDropConstraintOnColumnPrimaryKeyIfExists1<TTableName>
}
