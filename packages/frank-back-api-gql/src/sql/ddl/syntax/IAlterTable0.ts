import { Sql } from '../../ast'
import Identifier from '../Identifier'
import IAlterTableAlterColumn0 from './IAlterTableAlterColumn0'

/* tslint:disable:unified-signatures */
export default interface IAlterTable0 {
  alterColumn(column: string, def: string): IAlterTableAlterColumn0
  alterColumn(column: string, def: Sql): IAlterTableAlterColumn0

  alterColumn(column: Identifier, def: string): IAlterTableAlterColumn0
  alterColumn(column: Identifier, def: Sql): IAlterTableAlterColumn0
}
