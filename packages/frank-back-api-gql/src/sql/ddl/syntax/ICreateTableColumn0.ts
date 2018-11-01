import Database from 'store/Database'
import { Sql } from '../../ast'
import Identifier from '../Identifier'
import IExecutable from './IExecutable'

/* tslint:disable:unified-signatures */
export default interface ICreateTableColumn0 extends IExecutable {
  before(exec: (db: Database) => Promise<void>): ICreateTableColumn0

  after(exec: (db: Database) => Promise<void>): ICreateTableColumn0

  column(name: string, def: string): ICreateTableColumn0
  column(name: string, def: Sql): ICreateTableColumn0

  column(name: Identifier, def: string): ICreateTableColumn0
  column(name: Identifier, def: Sql): ICreateTableColumn0
}
