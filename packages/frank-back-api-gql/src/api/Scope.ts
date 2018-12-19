import { Pool, PoolConfig } from 'pg'
import { Config } from 'config'
import { Mailer } from 'mailer'
import Database from 'store/Database'
import { Log, logFor } from 'log'
import { MxClient } from 'mx'
import UnitOfWork from './UnitOfWork'
import User from './User'
import Assert from './assert/Assert'

type ScopeArgs = {
  config: Config
  user: null | User
}

export default class Scope {
  public readonly config: Config

  public readonly user: null | User

  public get mailer() {
    return (
      this._mailer ||
      (this._mailer = Mailer.create({
        logFor: this.logFor.bind(this),
        mailgunDomain: this.config.MAILGUN_DOMAIN,
        mailgunApiKey: this.config.MAILGUN_API_KEY,
        from: this.config.MAIL.from,
      }))
    )
  }

  public get pgpool() {
    return this._pgpool || (this._pgpool = new Pool(this.config.DATABASE))
  }

  public get db() {
    return (
      this._db || (this._db = new Database(this.pgpool, this.config.DATABASE))
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

  public constructor({ config, user }: ScopeArgs) {
    this.config = config
    this.user = user
    this._logs = {}
  }

  public createNew({ preserveUser }: { preserveUser?: boolean }): Scope {
    return new Scope({
      config: this.config,
      user: preserveUser ? this.user : null,
    })
  }

  public logFor(name: string): Log {
    return this._logs[name] || (this._logs[name] = logFor(name))
  }

  private _mailer?: Mailer
  private _pgpool?: Pool
  private _db?: Database
  private _uow?: UnitOfWork
  private _assert?: Assert
  private _mx?: MxClient
  private _logs: { [name: string]: Log }
}
