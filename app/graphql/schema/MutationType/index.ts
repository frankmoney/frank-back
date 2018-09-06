import { Type } from 'gql'
import storyCreate from './story/create'
import storyUpdate from './story/update'
import storyDelete from './story/delete'
import onboardingInstitutions from './onboarding/institutions'
import onboardingInstitutionCredentials from './onboarding/institutionCredentials'
import paymentUpdate from './payment/update'
import peerUpdate from './peer/update'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    storyCreate: storyCreate(field),
    storyUpdate: storyUpdate(field),
    storyDelete: storyDelete(field),
    onboardingInstitutions: onboardingInstitutions(field),
    onboardingInstitutionCredentials: onboardingInstitutionCredentials(field),
    paymentUpdate: paymentUpdate(field),
    peerUpdate: peerUpdate(field),
  })),
)

export default MutationType
