import { Peer, PeerWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createPeerResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => PeerWhereInput | Promise<PeerWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const first = 1

    const peers = await query.peers<Peer[]>(
      { where, first },
      `{ id, name, lastPaymentDate }`
    )

    const peer = (peers && peers[0]) || undefined

    return peer
  })

export default createPeerResolver
