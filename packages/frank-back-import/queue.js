import handleSource from './handleSource'
import createLogger from './createLogger'
import * as Sentry from '@sentry/node'

const log = createLogger('import:queue')

class Queue {

  constructor() {

    log.trace('constructor')

    this._queue = []
    this._isRuning = false
  }

  addImportTask(sourceId, daysAgo) {

    log.trace(`addImportTask sourceId: ${sourceId} daysAgo: ${daysAgo}`)

    this._queue.push([sourceId, daysAgo])

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

      await this.importSource(this._queue.shift())
    }

    this._isRuning = false

    log.trace('run stop')
  }

  async importSource([sourceId, daysAgo]) {

    log.trace(`importSource sourceId: ${sourceId}`)

    try {

      await handleSource(sourceId, daysAgo)

    } catch (e) {

      log.trace(`importSource exception: ${e}`)
      Sentry.captureException(e)
    }
  }
}

const queue = new Queue

export default queue
