import FieldArgument from 'gql/nodes/FieldArgument'
import FieldArgumentBuilder from 'gql/nodes/FieldArgumentBuilder'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import Onboarding from 'store/types/Onboarding'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import createMutations from 'utils/createMutations'
import OnboardingType from 'api/schema/OnboardingType'
import Scope from 'api/Scope'

type Args = {
  name: string
  step: string
  mutationArgs: (
    arg: FieldArgumentBuilder
  ) => { [argName: string]: FieldArgument }
  resolver: (
    onboading: Onboarding,
    args: any,
    scope: Scope
  ) => Promise<Onboarding>
}

const createResolver = (args: Args) =>
  createPrivateResolver(
    `Mutation:onboarding:${args.name}`,
    async ({ scope, args: graphArgs }) => {
      const existingOnboarding = await getOnboardingByUserId(
        { userId: scope.user.id },
        scope
      )

      if (!existingOnboarding || existingOnboarding.step !== args.step) {
        return throwArgumentError()
      }

      const updatedOnboarding = await args.resolver(
        existingOnboarding,
        graphArgs,
        scope
      )

      return mapOnboarding(updatedOnboarding)
    }
  )

const createMutation = (args: Args) =>
  createMutations(field => ({
    [`onboarding${args.name}`]: field
      .ofType(OnboardingType)
      .args(args.mutationArgs)
      .resolve(createResolver(args)),
  }))

export default createMutation
