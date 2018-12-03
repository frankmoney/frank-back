import { TEAM_STEP } from 'api/onboarding/constants'
import OnboardingMemberCreateInput from 'api/schema/OnboardingMemberCreateInput'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createOnboardingMutation from './helpers/createOnboardingMutation'

const mutation = createOnboardingMutation({
  name: 'UpdateTeam',
  step: TEAM_STEP,
  mutationArgs: arg => ({
    members: arg.listOf(OnboardingMemberCreateInput),
  }),
  resolver: async (onboarding, args, scope) => {
    return await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        team: {
          members: args.members,
        },
      },
      scope
    )
  },
})

export default mutation
