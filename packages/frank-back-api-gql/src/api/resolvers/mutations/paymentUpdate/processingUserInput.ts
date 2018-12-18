import Id from 'store/types/Id'
import getCategory from 'api/dal/Category/getCategory'
import Scope from 'api/Scope'
import Payment from 'store/types/Payment'
import findOrCreatePeer from 'api/dal/Peer/findOrCreatePeer'
import nullOrNotWhiteSpace from './nullOrNotWhiteSpace'
import { argumentError } from 'api/errors/ArgumentError'

type UserInput = {
  description: any
  peerName: any
  categoryPid: any
}

type Args = {
  existingPayment: Payment
  userInput: UserInput
  scope: Scope
}

type Out = {
  description?: string | null
  peerName?: string | null
  peerId?: Id | null
  categoryId?: Id | null
  descriptionUpdaterId?: Id
  peerUpdaterId?: Id
  categoryUpdaterId?: Id
}

const processingPeer = async (peerName: any, accountId: Id, scope: Scope) => {
  if (peerName) {
    const peerId = await findOrCreatePeer(
      {
        name: peerName,
        accountId,
        create: false,
      },
      scope
    )

    return peerId || null // id or null
  }

  return peerName // null | undefined
}

const processingCategory = async (
  categoryPid: any,
  accountId: Id,
  scope: Scope
) => {

  if (categoryPid) {
    const category = await getCategory(
      {
        where: {
          pid: { eq: categoryPid },
          account: { id: { eq: accountId } },
        },
      },
      scope
    )

    if (!category) {
      throw argumentError('Category not found')
    }

    return category
  }

  return categoryPid // null | undefined
}

const processingUserInput = async (args: Args): Promise<Out> => {
  const { userInput, existingPayment, scope } = args

  // description
  let description = nullOrNotWhiteSpace(userInput.description)

  description =
    description === existingPayment.description ? undefined : description

  const descriptionUpdaterId =
    description !== undefined ? scope.user!.id : undefined
  // description

  // peer
  let peerName = nullOrNotWhiteSpace(userInput.peerName)

  peerName = peerName === existingPayment.peerName ? undefined : peerName

  const peerUpdaterId = peerName !== undefined ? scope.user!.id : undefined

  const peerId = await processingPeer(
    peerName,
    existingPayment.accountId,
    scope
  )
  // peer

  // category
  const category = await processingCategory(
    userInput.categoryPid,
    existingPayment.accountId,
    scope
  )

  let categoryId: Id | undefined | null
  let categoryUpdaterId: Id | undefined

  const tempCategoryId = category && category.id

  if (
    tempCategoryId !== undefined &&
    tempCategoryId !== existingPayment.categoryId
  ) {
    categoryId = tempCategoryId
    categoryUpdaterId = scope.user!.id
  }
  // category

  return {
    description,
    peerName,
    peerId,
    categoryId,
    descriptionUpdaterId,
    peerUpdaterId,
    categoryUpdaterId,
  }
}

export default processingUserInput
