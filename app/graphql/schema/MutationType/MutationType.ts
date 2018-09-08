import { Type } from 'gql'
import onboarding from './onboarding'
import payment from './payment'
import peer from './peer'
import story from './story'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    ...payment(field),
    ...peer(field),
    ...story(field),
  }))
)

export default MutationType