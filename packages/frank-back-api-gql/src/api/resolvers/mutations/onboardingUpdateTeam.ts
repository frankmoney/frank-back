import { TEAM_STEP } from 'api/onboarding/constants'
import OnboadingMemberCreateInput from 'api/schema/OnboadingMemberCreateInput'
import createOnboardingUpdateStepMutation from './helpers/createOnboardingUpdateStepMutation'

const mutation = createOnboardingUpdateStepMutation({
  name: 'Team',
  step: TEAM_STEP,
  mutationArgs: arg => ({
    members: arg.listOf(OnboadingMemberCreateInput),
  }),
  resolve: (onboading, args) => ({
    team: {
      members: args.members,
    },
  }),
})

export default mutation
