import Identifier from '../Identifier'
import TableName from '../TableName'
import IAlterSequence from './IAlterSequence'
import IAlterTable0 from './IAlterTable0'
import IAlterTable1 from './IAlterTable1'

/* tslint:disable:unified-signatures */
export default interface IAlter {
  sequence(name: string): IAlterSequence
  sequence(name: Identifier): IAlterSequence

  table(name: string): IAlterTable0
  table<TTableName extends TableName>(
    name: TTableName
  ): IAlterTable1<TTableName>
}
