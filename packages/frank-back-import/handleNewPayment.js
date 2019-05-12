import createLogger from './createLogger'
import R from 'ramda'
import distance from 'damerau-levenshtein'

const log = createLogger('import:handleNewPayment')

const SIMILAR_LIMIT = process.env.SIMILAR_LIMIT || 0.8

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
      && distance(data.originalDescription, originalDescription).similarity >= SIMILAR_LIMIT
  }

  return freshestPayment(R.filter(p => condition(p.data), payments))
}

const thirdMatcher = (mxPayment, payments) => {

  const { originalDescription } = mxPayment

  const condition = (data) => {
    return distance(data.originalDescription, originalDescription).similarity >= SIMILAR_LIMIT
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
  filledPayments,
  importUserId,
) => {

  log.trace('start')

  const { amount, type, date, description } = mxPayment

  const newAmount = type === 'CREDIT' ? amount : amount * -1

  const result = {
    postedOn: date,
    amount: newAmount,
    peerName: description,
    data: mxPayment,
    verified: false,
  }

  let similarPayment

  for (const matcher of cascade) {
    similarPayment = matcher(mxPayment, filledPayments)

    if (similarPayment) {

      log.trace(`cascade[${cascade.indexOf(matcher)}] found similar payment`)

      break
    }
  }

  if (similarPayment) {

    result.categoryId = similarPayment.categoryId
    result.peerId = similarPayment.peerId
    result.peerName = similarPayment.peerName
    result.description = similarPayment.description

    result.descriptionUpdaterId = importUserId
    result.peerUpdaterId = importUserId
    result.categoryUpdaterId = importUserId
  }

  return result
}
