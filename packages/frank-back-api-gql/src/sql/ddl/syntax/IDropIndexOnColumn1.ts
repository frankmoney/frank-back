import Identifier from '../Identifier'
import TableName from '../TableName'
import IDropIndexOnColumnUnique1 from './IDropIndexOnColumnUnique1'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface IDropIndexOnColumn1<TTableName extends TableName>
  extends IExecutable {
  column(name: string): IDropIndexOnColumn1<TTableName>
  column(name: Identifier): IDropIndexOnColumn1<TTableName>
  column(name: (table: TTableName) => string): IDropIndexOnColumn1<TTableName>
  column(
    name: (table: TTableName) => Identifier
  ): IDropIndexOnColumn1<TTableName>

  unique(): IDropIndexOnColumnUnique1<TTableName>
}
