import TableName from '../TableName'
import ICreateForeignKeyOn0 from './ICreateForeignKeyOn0'
import ICreateForeignKeyOn1 from './ICreateForeignKeyOn1'

export default interface ICreateForeignKey {
  on(table: string): ICreateForeignKeyOn0
  on<TTableName extends TableName>(
    table: TTableName
  ): ICreateForeignKeyOn1<TTableName>
}
