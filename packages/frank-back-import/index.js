import * as Sentry from '@sentry/node'
import Account from './model/account'
import { CronJob } from 'cron'
import queue from './queue'
import createLogger from './createLogger'
import express from 'express'
import bodyParser from 'body-parser'

Sentry.init({ dsn: process.env.SENTRY_DSN })

const DEFAULT_DAYS_AGO = process.env.DEFAULT_DAYS_AGO || 2
const CRON = process.env.CRON || '0 10 * * * *'
const PORT = process.env.PORT || 3000

const log = createLogger('import:index')
const app = express()

const putAllAccountsInQueue = async () => {

  log.trace('putAllAccountsInQueue')

  const accounts = await Account.findAll()

  for (const account of accounts) {

    queue.addImportTask(account.id, DEFAULT_DAYS_AGO)
  }
}

new CronJob(CRON, putAllAccountsInQueue, null, true, 'UTC')

app.post('/import', bodyParser.json(), function(req, res) {

  try {

    let { accountId, daysAgo, delay } = req.body

    accountId = parseInt(accountId)
    daysAgo = parseInt(daysAgo)

    if (isNaN(accountId)) {
      throw new Error('accountId is not number')
    }

    if (isNaN(daysAgo)) {
      throw new Error('daysAgo is not number')
    }

    if (daysAgo < 1) {
      throw new Error(`daysAgo  isn't valid`)
    }

    if (delay) {

      delay = parseInt(delay)

      if (isNaN(delay)) {
        throw new Error('delay is not number')
      }

      if (delay < 1) {
        throw new Error(`delay  isn't valid`)
      }
    }
    else {
      delay = 1
    }

    setTimeout(() => queue.addImportTask(accountId, daysAgo), delay * 1000)

    res.send({ success: true })

  } catch (e) {

    res.send({ error: e.toString() })
  }
})

app.listen(PORT, function() {
  log.trace(`Import app listening on port ${PORT}`)
})
