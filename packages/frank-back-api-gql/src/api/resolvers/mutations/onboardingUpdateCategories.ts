import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingUpdateCategories = createPrivateResolver(
  'Mutation:onboarding:updateCategories',
  async ({ scope, args: { categories } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (!existingOnboarding || existingOnboarding.step !== CATEGORIES_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          categories: categories.map((x: string) => JSON.parse(x)),
        },
        scope
      )
    )
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
