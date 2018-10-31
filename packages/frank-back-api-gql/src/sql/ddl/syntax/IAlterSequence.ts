import Identifier from '../Identifier'
import TableName from '../TableName'
import IAlterSequenceOwnedBy from './IAlterSequenceOwnedBy'

/* tslint:disable:unified-signatures */
export default interface IAlterSequence {
  ownedBy(table: string, column: string): IAlterSequenceOwnedBy
  ownedBy(table: string, column: Identifier): IAlterSequenceOwnedBy

  ownedBy<TTableName extends TableName>(
    table: TTableName,
    column: string
  ): IAlterSequenceOwnedBy
  ownedBy<TTableName extends TableName>(
    table: TTableName,
    column: Identifier
  ): IAlterSequenceOwnedBy

  ownedBy<TTableName extends TableName>(
    table: TTableName,
    column: (table: TTableName) => string
  ): IAlterSequenceOwnedBy
  ownedBy<TTableName extends TableName>(
    table: TTableName,
    column: (table: TTableName) => Identifier
  ): IAlterSequenceOwnedBy
}
