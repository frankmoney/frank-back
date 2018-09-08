import createMutations from 'utils/createMutations'
import peerUpdate from './peerUpdate'

export default createMutations(field => ({
  ...peerUpdate(field),
}))
