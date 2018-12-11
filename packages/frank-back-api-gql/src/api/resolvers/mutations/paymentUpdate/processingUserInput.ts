import Id from 'store/types/Id'
import getCategoryByPidAndAccountId from 'api/dal/Category/getCategoryByPidAndAccountId'
import Scope from 'api/Scope'
import getPeer from 'api/dal/Peer/getPeer'
import handleString from './handleString'

type Args = {
  description: any
  peerName: any
  peerPid: any
  categoryPid: any
  accountId: Id
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

const processingPeer = async (peerPid: any, accountId: Id, scope: Scope) => {
  if (peerPid) {
    const peer = await getPeer(
      {
        where: {
          pid: { eq: peerPid },
          account: { id: { eq: accountId } },
        },
      },
      scope
    )

    return {
      peerId: peer.id,
      peerUpdaterId: scope.user!.id,
    }
  }
  if (peerPid === null) {
    return {
      peerId: null,
      peerUpdaterId: scope.user!.id,
    }
  }

  return {}
}

const processingCategory = async (
  categoryPid: any,
  accountId: Id,
  scope: Scope
) => {
  if (categoryPid) {
    const category = await getCategoryByPidAndAccountId(
      { accountId, pid: categoryPid },
      scope
    )

    return {
      categoryId: category.id,
      categoryUpdaterId: scope.user!.id,
    }
  }

  if (categoryPid === null) {
    return {
      categoryId: null,
      categoryUpdaterId: scope.user!.id,
    }
  }

  return {}
}

const processingUserInput = async (args: Args): Promise<Out> => {
  let { description, peerName } = args

  const { peerPid, categoryPid, accountId, scope } = args

  description = handleString(description)
  peerName = handleString(peerName)

  let { peerId, peerUpdaterId } = await processingPeer(
    peerPid,
    accountId,
    scope
  )
  const { categoryId, categoryUpdaterId } = await processingCategory(
    categoryPid,
    accountId,
    scope
  )

  let descriptionUpdaterId: Id | undefined

  if (description !== undefined) {
    descriptionUpdaterId = scope.user!.id
  }

  if (peerName !== undefined) {
    peerUpdaterId = scope.user!.id
  }

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
