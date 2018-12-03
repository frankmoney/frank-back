import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import createMutations from 'utils/createMutations'
import OnboardingType from 'api/schema/OnboardingType'

type Args = {
  name: string
  from: string
  to: string
}

const createResolver = (args: Args) =>
  createPrivateResolver(
    `Mutation:onboarding:complete${args.name}`,
    async ({ scope }) => {
      const existingOnboarding = await getOnboardingByUserId(
        { userId: scope.user.id },
        scope
      )

      if (!existingOnboarding || existingOnboarding.step !== args.from) {
        return throwArgumentError()
      }

      return mapOnboarding(
        await updateOnboardingByPid(
          {
            pid: existingOnboarding.pid,
            step: args.to,
          },
          scope
        )
      )
    }
  )

const createMutation = (args: Args) =>
  createMutations(field => ({
    [`onboardingComplete${args.name}`]: field
      .ofType(OnboardingType)
      .resolve(createResolver(args)),
  }))

export default createMutation
