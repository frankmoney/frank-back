import { Type } from 'gql'
import meChangePassword from './meChangePassword'
import onboarding from './onboarding'
import payment from './payment'
import peer from './peer'
import story from './story'
import teamInviteSend from './teamInviteSend'
import teamMemberUpdateRole from './teamMemberUpdateRole'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...meChangePassword(field),
    ...onboarding(field),
    ...payment(field),
    ...peer(field),
    ...story(field),
    ...teamInviteSend(field),
    ...teamMemberUpdateRole(field),
  }))
)

export default MutationType
