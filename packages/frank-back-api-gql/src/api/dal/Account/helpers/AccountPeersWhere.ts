import PeerWhere from '../../Peer/helpers/PeerWhere'

export default interface AccountPeersWhere {
  empty?: boolean
  any?: PeerWhere
  none?: PeerWhere
  or?: AccountPeersWhere | AccountPeersWhere[]
  and?: AccountPeersWhere | AccountPeersWhere[]
}
