import TableName from '../TableName'
import ICreateIndexOn0 from './ICreateIndexOn0'
import ICreateIndexOn1 from './ICreateIndexOn1'

export default interface ICreateIndex {
  on(table: string): ICreateIndexOn0
  on<TTableName extends TableName>(
    table: TTableName
  ): ICreateIndexOn1<TTableName>
}
