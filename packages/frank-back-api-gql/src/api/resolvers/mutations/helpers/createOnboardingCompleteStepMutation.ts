import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createOnboardingMutation from './createOnboardingMutation'

type Args = {
  name: string
  from: string
  to: string
}

const createMutation = (args: Args) =>
  createOnboardingMutation({
    name: `Complete${args.name}`,
    step: args.from,
    mutationArgs: () => ({}),
    resolver: async (existingOnboarding, graphArgs, scope) => {
      return await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          step: args.to,
        },
        scope
      )
    },
  })

export default createMutation
