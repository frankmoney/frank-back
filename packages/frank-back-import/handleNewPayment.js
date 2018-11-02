import createLogger from './createLogger'
import R from 'ramda'
import distance from 'damerau-levenshtein'

const log = createLogger('import:handleNewPayment')

const SIMILAR_LIMIT = 0.8

const freshestPayment = (payments) => {

  return R.sort((a, b) => b.postedOn >= a.postedOn, payments)[0]
}

const firstMatcher = (mxPayment, payments) => {

  const { amount, type, originalDescription } = mxPayment

  const condition = R.whereEq({
    originalDescription,
    amount,
    type,
  })

  return freshestPayment(R.filter(p => condition(p.data), payments))
}

const secondMatcher = (mxPayment, payments) => {

  const { amount, type, originalDescription } = mxPayment

  const condition = (data) => {
    return R.whereEq({ amount, type })(data)
      && distance(data.originalDescription, originalDescription).similarity > SIMILAR_LIMIT
  }

  return freshestPayment(R.filter(p => condition(p.data), payments))
}

const thirdMatcher = (mxPayment, payments) => {

  const { originalDescription } = mxPayment

  const condition = (data) => {
    return distance(data.originalDescription, originalDescription).similarity > SIMILAR_LIMIT
  }

  return freshestPayment(R.filter(p => condition(p.data), payments))
}

const cascade = [
  firstMatcher,
  secondMatcher,
  thirdMatcher,
]

export default (
  mxPayment,
  account,
  publishedPayments,
) => {

  log.trace('start')

  const { amount, type, date, description } = mxPayment

  const newAmount = type === 'CREDIT' ? amount : amount * -1

  const result = {
    postedOn: date,
    amount: newAmount,
    peerName: description,
    data: mxPayment,
    accountId: account.id,
  }

  let similarPayment = null

  for (const i in cascade) {

    const matcher = cascade[i]

    similarPayment = matcher(mxPayment, publishedPayments)

    if (similarPayment) {

      log.trace(`cascade[${i}] found similar payment`)

      break
    }
  }

  if (similarPayment) {

    result.categoryId = similarPayment.categoryId
    result.peerId = similarPayment.peerId
    result.description = similarPayment.description
  }

  return result
}
