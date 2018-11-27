import * as Sentry from '@sentry/node'
import Account from './model/account'
import { CronJob } from 'cron'
import queue from './queue'
import createLogger from './createLogger'

Sentry.init({ dsn: process.env.SENTRY_DSN })

const DEFAULT_DAYS_AGO = process.env.DEFAULT_DAYS_AGO || 2
const CRON = process.env.CRON || '0 10 * * * *'

const log = createLogger('import:index')

const putAllAccountsInQueue = async () => {

  log.trace('putAllAccountsInQueue')

  const accounts = await Account.findAll()

  for (const account of accounts) {

    queue.addImportTask(account.id, DEFAULT_DAYS_AGO)
  }

}

new CronJob(CRON, putAllAccountsInQueue, null, true, 'UTC')
