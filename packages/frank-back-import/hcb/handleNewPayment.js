import R from 'ramda'
import distance from 'damerau-levenshtein'

const SIMILAR_LIMIT = process.env.SIMILAR_LIMIT || 0.8

const freshestPayment = (payments) => {

  return R.sort((a, b) => b.postedOn >= a.postedOn, payments)[0]
}

const firstMatcher = (paymentData, payments) => {

  const { amount, memo } = paymentData

  const condition = R.whereEq({
    memo,
    amount,
  })

  return freshestPayment(R.filter(p => condition(p.data), payments))
}


const secondMatcher = (paymentData, payments) => {

  const { memo } = paymentData

  const condition = (data) => {
    return distance(data.memo, memo).similarity >= SIMILAR_LIMIT
  }

  return freshestPayment(R.filter(p => condition(p.data), payments))
}

export default (paymentData, filledPayments, importUserId) => {

	paymentData.amount = paymentData.amount/100

	const {amount, created_at, memo} = paymentData	

	paymentData.originalDescription = memo

	const result = {
		postedOn: created_at,
		amount: amount,
		description: memo,
		data: paymentData,
		verified: false,
	}

	let similarPayment = firstMatcher(paymentData, filledPayments)

	if (!similarPayment) {
		similarPayment = secondMatcher(paymentData, filledPayments)
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