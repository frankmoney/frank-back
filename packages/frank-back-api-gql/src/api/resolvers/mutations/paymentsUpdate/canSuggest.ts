import { SystemUserId } from 'store/enums'
import Payment from 'store/types/Payment'
import R from 'ramda'
import Id from 'store/types/Id'

const isSystemUser = (id: Id) =>
  R.contains(id, [
    SystemUserId.migration,
    SystemUserId.import,
    SystemUserId.suggestion,
    SystemUserId.system,
  ])

type UserInput = {
  categoryId?: Id | null
  peerName?: string | null
  description?: string | null
}

type Args = {
  existingPayment: Payment
  userInput: UserInput
}

export const canSuggestCategory = (args: Args): boolean => {
  const { existingPayment, userInput } = args

  return (
    existingPayment.verified !== true &&  // payment is new
    userInput.categoryId === undefined && // user don't set new category
    (R.isNil(existingPayment.categoryId) || // category empty
    R.isNil(existingPayment.categoryUpdaterId) || // updater is empty
      isSystemUser(existingPayment.categoryUpdaterId)) // category was installed by AI (lol)
  )
}

export const canSuggestPeer = (args: Args): boolean => {
  const { existingPayment, userInput } = args

  return (
    existingPayment.verified !== true &&  // payment is new
    userInput.peerName === undefined && // user don't set new peer
    (R.isNil(existingPayment.peerName) || // peer empty
    R.isNil(existingPayment.peerUpdaterId) || // updater is empty
      isSystemUser(existingPayment.peerUpdaterId)) // peer was installed by AI (lol)
  )
}

export const canSuggestDescription = (args: Args): boolean => {
  const { existingPayment, userInput } = args

  return (
    existingPayment.verified !== true &&  // payment is new
    userInput.description === undefined && // user don't set new description
    (R.isNil(existingPayment.description) || // description empty
    R.isNil(existingPayment.descriptionUpdaterId) || // updater is empty
      isSystemUser(existingPayment.descriptionUpdaterId)) // description was installed by AI (lol)
  )
}
