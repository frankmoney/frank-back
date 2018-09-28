import createMutations from 'utils/createMutations'
import paymentUpdate from './paymentUpdate'

export default createMutations(field => ({
  ...paymentUpdate(field),
}))
