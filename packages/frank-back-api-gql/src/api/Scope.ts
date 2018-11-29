import { Pool, PoolConfig } from 'pg'
import Database from 'store/Database'
import DatabaseConfig from 'store/DatabaseConfig'
import { Log, logFor } from 'log'
import { MxClient } from 'mx'
import UnitOfWork from './UnitOfWork'
import User from './User'
import Assert from './assert/Assert'

type ScopeArgs = {
  user: null | User
  databaseConfig: PoolConfig
}

export default class Scope {
  public readonly databaseConfig: DatabaseConfig

  public readonly user: null | User

  public get pgpool() {
    return this._pgpool || (this._pgpool = new Pool(this.databaseConfig))
  }

  public get db() {
    return (
      this._db || (this._db = new Database(this.pgpool, this.databaseConfig))
    )
  }

  public get uow() {
    return this._uow || (this._uow = UnitOfWork.create(this))
  }

  public get assert() {
    return this._assert || (this._assert = Assert.create(this))
  }

  public get mx() {
    return this._mx || (this._mx = MxClient.create(this))
  }

  public constructor({ databaseConfig, user }: ScopeArgs) {
    this.databaseConfig = databaseConfig
    this.user = user
    this._logs = {}
  }

  public createNew({ preserveUser }: { preserveUser?: boolean }): Scope {
    return new Scope({
      databaseConfig: this.databaseConfig,
      user: preserveUser ? this.user : null,
    })
  }

  public logFor(name: string): Log {
    return this._logs[name] || (this._logs[name] = logFor(name))
  }

  private _pgpool?: Pool
  private _db?: Database
  private _uow?: UnitOfWork
  private _assert?: Assert
  private _mx?: MxClient
  private _logs: { [name: string]: Log }
}
