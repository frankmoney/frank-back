import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { TEAM_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import { Json } from 'gql/index'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingUpdateTeam = createPrivateResolver(
  'Mutation:onboarding:updateTeam',
  async ({ user, args: { members }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding || existingOnboarding.step !== TEAM_STEP) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: existingOnboarding.id },
      data: {
        team: {
          members: members.map((x: string) => JSON.parse(x)),
        },
      },
    })

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingUpdateTeam: field
    .ofType(OnboardingType)
    .args(arg => ({
      members: arg.listOf(Json),
    }))
    .resolve(onboardingUpdateTeam),
}))
