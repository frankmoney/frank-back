import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { REVENUE_CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import OnboadingCategoryCreateInput from 'api/schema/OnboadingCategoryCreateInput'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingUpdateRevenueCategories = createPrivateResolver(
  'Mutation:onboarding:updateRevenueCategories',
  async ({ scope, args: { categories } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (
      !existingOnboarding ||
      existingOnboarding.step !== REVENUE_CATEGORIES_STEP
    ) {
      return throwArgumentError()
    }

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          categories: {
            ...existingOnboarding.categories,
            revenue: categories,
          },
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
      categories: arg.listOf(OnboadingCategoryCreateInput),
    }))
    .resolve(onboardingUpdateRevenueCategories),
}))
