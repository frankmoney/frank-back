import { Pool, PoolConfig } from 'pg'
import UnitOfWork from './UnitOfWork'
import User from './User'

type ScopeArgs = {
  user: null | User
  databaseConfig: PoolConfig
}

export default class Scope {
  public readonly databaseConfig: PoolConfig

  public readonly user: null | User

  public get pgpool() {
    return (
      this._pgpool ||
      (this._pgpool = new Pool(this.databaseConfig))
    )
  }

  public get uow() {
    return this._uow || (this._uow = UnitOfWork.create(this))
  }

  public constructor({ databaseConfig, user }: ScopeArgs) {
    this.databaseConfig = databaseConfig
    this.user = user
  }

  private _pgpool?: Pool
  private _uow?: UnitOfWork
}
