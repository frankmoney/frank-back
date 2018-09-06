import { PeerWhereUniqueInput } from 'app/graphql/generated/prisma'
import PeerType from 'app/graphql/schema/PeerType'
import { ID, Input, String } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'

const UpdatePeerUpdateInput = Input('UpdatePeerUpdateInput', type =>
  type.fields(field => ({
    name: field.ofType(String),
  })))


const peerUpdate = createPrivateResolver(
  'Mutation:peer:update',
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
  },
)


export default (field: any) => field
  .ofType(PeerType)
  .args((arg: any) => ({
    peerId: arg.ofType(ID),
    update: arg.ofType(UpdatePeerUpdateInput),
  }))
  .resolve(peerUpdate)
