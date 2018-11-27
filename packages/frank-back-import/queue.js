import handleAccount from './handleAccount'
import createLogger from './createLogger'
import * as Sentry from '@sentry/node'

const log = createLogger('import:queue')

class Queue {

  constructor() {

    log.trace('constructor')

    this._queue = []
    this._isRuning = false
  }

  addImportTask(accountId, daysAgo) {

    log.trace(`addImportTask accountId: ${accountId} daysAgo: ${daysAgo}`)

    this._queue.push([accountId, daysAgo])

    if (!this._isRuning) {

      setTimeout(() => this.run(), 1000)
    }
  }

  async run() {

    if (this._isRuning) {
      return
    }

    log.trace('run start')

    this._isRuning = true

    while (this._queue.length > 0) {

      log.trace(`run _queue.length: ${this._queue.length}`)

      await this.importAccount(this._queue.shift())
    }

    this._isRuning = false

    log.trace('run stop')
  }

  async importAccount([accountId, daysAgo]) {

    log.trace(`importAccount accountId: ${accountId}`)

    try {

      await handleAccount(accountId, daysAgo)

    } catch (e) {

      log.trace(`importAccount exception: ${e}`)
      Sentry.captureException(e)
    }
  }
}

const queue = new Queue

export default queue
