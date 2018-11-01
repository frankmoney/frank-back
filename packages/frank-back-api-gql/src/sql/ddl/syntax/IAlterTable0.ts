import { Sql } from '../../ast'
import Identifier from '../Identifier'
import IAlterTableAddColumn0 from './IAlterTableAddColumn0'
import IAlterTableAlterColumn0 from './IAlterTableAlterColumn0'
import IAlterTableDropColumn0 from './IAlterTableDropColumn0'

/* tslint:disable:unified-signatures */
export default interface IAlterTable0 {
  addColumn(column: string, def: string): IAlterTableAddColumn0
  addColumn(column: string, def: Sql): IAlterTableAddColumn0

  addColumn(column: Identifier, def: string): IAlterTableAddColumn0
  addColumn(column: Identifier, def: Sql): IAlterTableAddColumn0

  alterColumn(column: string, def: string): IAlterTableAlterColumn0
  alterColumn(column: string, def: Sql): IAlterTableAlterColumn0

  alterColumn(column: Identifier, def: string): IAlterTableAlterColumn0
  alterColumn(column: Identifier, def: Sql): IAlterTableAlterColumn0

  dropColumn(column: string): IAlterTableDropColumn0
  dropColumn(column: Identifier): IAlterTableDropColumn0
}
