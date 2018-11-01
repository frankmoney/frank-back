import Database from 'store/Database'
import { Sql } from '../../ast'
import Identifier from '../Identifier'
import ICreateTableColumn0 from './ICreateTableColumn0'

/* tslint:disable:unified-signatures */
export default interface ICreateTable0 {
  before(exec: (db: Database) => Promise<void>): ICreateTable0

  after(exec: (db: Database) => Promise<void>): ICreateTable0

  column(name: string, def: string): ICreateTableColumn0
  column(name: string, def: Sql): ICreateTableColumn0

  column(name: Identifier, def: string): ICreateTableColumn0
  column(name: Identifier, def: Sql): ICreateTableColumn0
}
