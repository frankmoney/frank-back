import { PeerWhereUniqueInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'updatePeer',
  async ({
    assert,
    args: {
      peerId,
      update: { name },
    },
    prisma: { mutation },
    info,
  }) => {
    await assert.peerAccess(peerId)

    const where: PeerWhereUniqueInput = {
      id: peerId,
    }

    const data = { name }

    const peer = await mutation.updatePeer({ where, data }, info)

    return peer
  }
)
