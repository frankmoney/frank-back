import { Type } from 'gql'
import storyCreate from './story/create'
import storyUpdate from './story/update'
import storyDelete from './story/delete'
import paymentUpdate from './payment/update'
import peerUpdate from './peer/update'
import onboardingSelectInstitution from './onboarding/selectInstitution'
import onboardingCancel from './onboarding/cancel'
import onboardingEnterCredentials from './onboarding/enterCredentials'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    storyCreate: storyCreate(field),
    storyUpdate: storyUpdate(field),
    storyDelete: storyDelete(field),
    paymentUpdate: paymentUpdate(field),
    peerUpdate: peerUpdate(field),
    onboardingSelectInstitution: onboardingSelectInstitution(field),
    onboardingCancel: onboardingCancel(field),
    onboardingEnterCredentials: onboardingEnterCredentials(field),
  }))
)

export default MutationType
