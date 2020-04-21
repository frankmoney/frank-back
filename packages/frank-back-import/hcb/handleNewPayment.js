
export default (paymentData, filledPayments, importUserId) => {

	const {amount, created_at, memo} = paymentData	

	paymentData.originalDescription = memo

	const result = {
		postedOn: created_at,
		amount: amount,
		description: memo,
		data: paymentData,
		verified: false,
	}

	return result
}