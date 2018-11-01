import TableName from '../TableName'
import IDropIndexOn0 from './IDropIndexOn0'
import IDropIndexOn1 from './IDropIndexOn1'

export default interface IDropIndex {
  on(table: string): IDropIndexOn0
  on<TTableName extends TableName>(table: TTableName): IDropIndexOn1<TTableName>
}
