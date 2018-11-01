import Identifier from '../Identifier'
import TableName from '../TableName'
import IDropIndexOnColumn1 from './IDropIndexOnColumn1'

/* tslint:disable:unified-signatures */
export default interface IDropIndexOn1<TTableName extends TableName> {
  column(name: string): IDropIndexOnColumn1<TTableName>
  column(name: Identifier): IDropIndexOnColumn1<TTableName>
  column(name: (table: TTableName) => string): IDropIndexOnColumn1<TTableName>
  column(
    name: (table: TTableName) => Identifier
  ): IDropIndexOnColumn1<TTableName>
}
