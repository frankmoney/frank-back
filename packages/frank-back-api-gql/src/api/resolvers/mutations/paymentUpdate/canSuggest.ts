import { SystemUserId } from 'store/enums'
import Payment from 'store/types/Payment'
import R from 'ramda'
import Pid from 'api/types/Pid'
import Id from 'store/types/Id'

const isSystemUser = (id: Id) =>
  R.contains(id, [
    SystemUserId.migration,
    SystemUserId.import,
    SystemUserId.suggestion,
    SystemUserId.system,
  ])

type UserInput = {
  categoryPid?: Pid | null
  peerPid?: Pid | null
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
    userInput.categoryPid === undefined && // user don't set new category
    (R.isNil(existingPayment.categoryId) || // category empty
      isSystemUser(existingPayment.categoryUpdaterId)) // category was installed by AI (lol)
  )
}

export const canSuggestPeer = (args: Args): boolean => {
  const { existingPayment, userInput } = args

  return (
    userInput.peerPid === undefined &&
    userInput.peerName === undefined && // user don't set new peer
    ((R.isNil(existingPayment.peerName) && R.isNil(existingPayment.peerId)) || // peer empty
      isSystemUser(existingPayment.peerUpdaterId)) // peer was installed by AI (lol)
  )
}

export const canSuggestDescription = (args: Args): boolean => {
  const { existingPayment, userInput } = args

  return (
    userInput.description === undefined && // user don't set new description
    (R.isNil(existingPayment.description) || // description empty
      isSystemUser(existingPayment.descriptionUpdaterId)) // description was installed by AI (lol)
  )
}
