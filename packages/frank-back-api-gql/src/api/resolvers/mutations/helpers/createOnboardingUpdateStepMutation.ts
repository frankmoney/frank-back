import FieldArgument from 'gql/nodes/FieldArgument'
import FieldArgumentBuilder from 'gql/nodes/FieldArgumentBuilder'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import Onboarding from 'store/types/Onboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import createMutations from 'utils/createMutations'
import OnboardingType from 'api/schema/OnboardingType'

type Args = {
  name: string
  step: string
  resolve: (onboading: Onboarding, args: any) => any
  mutationArgs: (
    arg: FieldArgumentBuilder
  ) => { [argName: string]: FieldArgument }
}

const createResolver = (args: Args) =>
  createPrivateResolver(
    `Mutation:onboarding:update${args.name}`,
    async ({ scope, args: graphArgs }) => {
      const existingOnboarding = await getOnboardingByUserId(
        { userId: scope.user.id },
        scope
      )

      if (!existingOnboarding || existingOnboarding.step !== args.step) {
        return throwArgumentError()
      }

      const data = args.resolve(existingOnboarding, graphArgs)

      return mapOnboarding(
        await updateOnboardingByPid(
          {
            pid: existingOnboarding.pid,
            ...data,
          },
          scope
        )
      )
    }
  )

const createMutation = (args: Args) =>
  createMutations(field => ({
    [`onboardingUpdate${args.name}`]: field
      .ofType(OnboardingType)
      .args(args.mutationArgs)
      .resolve(createResolver(args)),
  }))

export default createMutation
