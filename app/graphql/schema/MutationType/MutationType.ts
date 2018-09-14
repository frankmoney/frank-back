import { Type } from 'gql'
import onboarding from './onboarding'
import story from './story'
import payment from './payment'
import peer from './peer'
import teamMemberUpdateRole from './teamMemberUpdateRole'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    ...story(field),
    ...payment(field),
    ...peer(field),
    ...teamMemberUpdateRole(field),
  }))
)

export default MutationType
