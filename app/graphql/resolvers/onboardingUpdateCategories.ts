import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { CATEGORIES_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingUpdateCategories = createPrivateResolver(
  'Mutation:onboarding:updateCategories',
  async ({ user, args: { categories }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding || existingOnboarding.step !== CATEGORIES_STEP) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: existingOnboarding.id },
      data: {
        categories: categories.map((x: string) => JSON.parse(x)),
      },
    })

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingUpdateCategories: field
    .ofType(OnboardingType)
    .args(arg => ({
      categories: arg.listOf(Json),
    }))
    .resolve(onboardingUpdateCategories),
}))
