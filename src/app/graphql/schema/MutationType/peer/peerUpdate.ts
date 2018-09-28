import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import {
  PeerUpdateInput,
  PeerWhereUniqueInput,
} from 'app/graphql/generated/prisma'
import PeerType from 'app/graphql/schema/PeerType'
import UpdatePeerUpdateInput from 'app/graphql/schema/UpdatePeerUpdateInput'

const peerUpdate = createPrivateResolver(
  'Mutation:peerUpdate',
  async ({
    assert,
    args: {
      peerId,
      update: { name },
    },
    prisma: { mutation },
  }) => {
    await assert.peerAccess(peerId)

    const where: PeerWhereUniqueInput = {
      id: peerId,
    }

    const data: PeerUpdateInput = { name }

    const peer = await mutation.updatePeer(
      { where, data },
      `{ id, name, lastPaymentDate }`
    )

    return peer
  }
)

export default createMutations(field => ({
  peerUpdate: field
    .ofType(PeerType)
    .args((arg: any) => ({
      peerId: arg.ofID(),
      update: arg.ofType(UpdatePeerUpdateInput),
    }))
    .resolve(peerUpdate),
}))
