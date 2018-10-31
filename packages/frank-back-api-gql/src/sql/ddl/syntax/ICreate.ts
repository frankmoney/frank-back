import Identifier from '../Identifier'
import TableName from '../TableName'
import ICreateConstraint from './ICreateConstraint'
import ICreateForeignKey from './ICreateForeignKey'
import ICreateIndex from './ICreateIndex'
import ICreateSequence from './ICreateSequence'
import ICreateTable1 from './ICreateTable1'
import ICreateTable0 from './ICreateTable0'

/* tslint:disable:unified-signatures */
export default interface ICreate {
  constraint(): ICreateConstraint
  constraint(name: string): ICreateConstraint
  constraint(name: Identifier): ICreateConstraint

  foreignKey(): ICreateForeignKey
  foreignKey(name: string): ICreateForeignKey
  foreignKey(name: Identifier): ICreateForeignKey

  index(): ICreateIndex
  index(name: string): ICreateIndex
  index(name: Identifier): ICreateIndex

  sequence(name: string): ICreateSequence
  sequence(name: Identifier): ICreateSequence

  table(name: string): ICreateTable0
  table<TTableName extends TableName>(
    name: TTableName
  ): ICreateTable1<TTableName>
}
