import TableName from '../TableName'
import IDropConstraintOnColumnUniqueIfExists1 from './IDropConstraintOnColumnUniqueIfExists1'
import IExecutable from './IExecutable'

export default interface IDropConstraintOnColumnUnique1<
  TTableName extends TableName
> extends IExecutable {
  ifExists(): IDropConstraintOnColumnUniqueIfExists1<TTableName>
}
