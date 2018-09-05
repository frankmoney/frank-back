import { Type } from 'gql'
import storyCreate from './story/create'
import storyUpdate from './story/update'
import storyDelete from './story/delete'
import onboardingInstitutions from './onboarding/institutions'
import onboardingInstitutionCredentials from './onboarding/institutionCredentials'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    storyCreate: storyCreate(field),
    storyUpdate: storyUpdate(field),
    storyDelete: storyDelete(field),
    onboardingInstitutions: onboardingInstitutions(field),
    onboardingInstitutionCredentials: onboardingInstitutionCredentials(field),
  })),
)

export default MutationType
