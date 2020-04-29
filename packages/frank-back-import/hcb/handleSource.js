import createLogger from '../createLogger'
import Source from '../model/source'
import request from 'request'
import syncPayments from './syncPayments'

const HCB_IMPORT_URL = process.env.HCB_IMPORT_URL

const log = createLogger('import:handleHcbSource')

const requestHcbPayments = async (page, token) => {

  const options = {
    url: `${HCB_IMPORT_URL}?page=${page}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  return await new Promise(function(resolve, reject) {
    request.get(options, (e, r, body) => {

      resolve({
        statusCode: r.statusCode,
        body: JSON.parse(body)
      })
    })
  });
}

export default async (source) => {

  const {data} = source

  if (!data.token || data.token.length < 1) {
    throw new Error(`HCB source token undefined: ${source.id}}`)
  }

  let page = 1
  let haveTransactions = true
  let haveNewPyaments = true

  while (haveTransactions && haveNewPyaments) {

    log.trace(`request page: ${page}`)

    const {statusCode, body} = await requestHcbPayments(page, data.token)

    if (statusCode !== 200) {
      throw new Error(`HCB response statusCode: ${statusCode}`)
    }

    if (!Array.isArray(body.transactions)) {
      throw new Error(`HCB response 'transactions' is not array`)
    }

    if (!body.balance) {
      throw new Error(`HCB response 'balance' undefined`)
    }

    const balance = body.balance / 100

    if (data.balance !== balance) {
          
      data.balance = balance
      data.lastUpdateDate = (new Date()).toISOString()

      await source.update({data})
    }



    log.trace(`transactions in page: ${body.transactions.length}`)

    if (body.transactions.length > 0) {

      const newPayments = await syncPayments(source, body.transactions)

      haveNewPyaments = newPayments.length > 0

      page += 1

    } else {

      haveTransactions = false
    }
  }
}
