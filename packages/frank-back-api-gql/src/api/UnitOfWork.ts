import Log from 'log/Log'
import Database from 'store/Database'
import Scoped from './Scoped'

export default class UnitOfWork {
  public static create(scope: Scoped<'logFor' | 'db'>) {
    return new UnitOfWork(scope.logFor('app:uow'), scope.db)
  }

  public get log() {
    return this._log
  }

  public get db() {
    return this._db
  }

  public constructor(log: Log, db: Database) {
    this._log = log
    this._db = db
  }

  public async dispose() {
    this.log.trace('Disposing')

    switch (this.db.state) {
      case 'tx-active':
      case 'tx-delayed':
        let error: undefined | Error
        try {
          await this.db.rollback()
        } catch (exc) {
          this.log.error('Failed to roll back db transaction\r\n%O', exc)
          error = exc
        }

        try {
          await this.db.close(error)
        } catch (exc) {
          this.log.error('Failed to close db client\r\n%O', exc)
        }
        break
      case 'open':
        try {
          await this.db.close()
        } catch (exc) {
          this.log.error('Failed to close db client\r\n%O', exc)
          try {
            await this.db.close(exc)
          } catch {
            // ignore
          }
        }
        break
    }

    this.log.trace('Disposed')
  }

  public async start() {
    this.log.trace('Starting')

    try {
      switch (this.db.state) {
        case 'closed':
          await this.db.open()
        case 'open':
          await this.db.begin(true)
          break
      }
    } catch (exc) {
      this.log.error('Failed to start\r\n%O', exc)
      throw exc
    }

    this.log.trace('Started')
  }

  public async commit() {
    this.log.trace('Committing')

    switch (this.db.state) {
      case 'tx-active':
      case 'tx-delayed':
        try {
          await this.db.commit()
        } catch (exc) {
          this.log.error('Failed to commit\r\n%O', exc)
          throw exc
        }
        break
    }

    this.log.trace('Committed')
  }

  public async rollback() {
    this.log.trace('Rolling back')

    switch (this.db.state) {
      case 'tx-active':
      case 'tx-delayed':
        try {
          await this.db.rollback()
        } catch (exc) {
          this.log.error('Failed to roll back\r\n%O', exc)
          this.db.reset(exc)
          throw exc
        }
        break
    }

    this.log.debug('Rolled back')
  }

  private readonly _log: Log
  private readonly _db: Database
}
