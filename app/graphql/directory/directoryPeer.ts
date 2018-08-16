import { PeerWhereUniqueInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'directoryPeer',
  async ({ assert, args: { peerId }, prisma: { query }, info }) => {
    await assert.peerAccess(peerId)

    const where: PeerWhereUniqueInput = {
      id: peerId,
    }

    const peer = await query.peer({ where }, info)

    return peer
  }
)
