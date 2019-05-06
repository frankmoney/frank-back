import * as Sentry from '@sentry/node'
import Source from './model/source'
import { CronJob } from 'cron'
import queue from './queue'
import createLogger from './createLogger'
import express from 'express'
import bodyParser from 'body-parser'
import clearMxUsers from './clearMxUsers'

Sentry.init({ dsn: process.env.SENTRY_DSN })

const DEFAULT_DAYS_AGO = process.env.DEFAULT_DAYS_AGO || 2
const CRON = process.env.CRON || '0 10 * * *'
const PORT = process.env.PORT || 3000

const log = createLogger('import:index')
const app = express()

const putAllSourcesInQueue = async () => {

  log.trace('putAllSourcesInQueue')

  const sources = await Source.findAll()

  for (const source of sources) {

    queue.addImportTask(source.id, DEFAULT_DAYS_AGO)
  }
}

new CronJob(CRON, putAllSourcesInQueue, null, true, 'UTC')

// new CronJob('0 11 * * *', clearMxUsers, null, true, 'UTC')

app.post('/import', bodyParser.json(), function(req, res) {

  try {

    let { sourceId, daysAgo } = req.body

    sourceId = parseInt(sourceId)
    daysAgo = parseInt(daysAgo)

    if (isNaN(sourceId)) {
      throw new Error('sourceId is not number')
    }

    if (isNaN(daysAgo)) {
      throw new Error('daysAgo is not number')
    }

    if (daysAgo < 1) {
      throw new Error(`daysAgo  isn't valid`)
    }

    queue.addImportTask(sourceId, daysAgo)

    res.send({ success: true })

  } catch (e) {

    res.send({ error: e.toString() })
  }
})

app.listen(PORT, function() {
  log.trace(`Import app listening on port ${PORT}`)
})
