import { throwArgumentError } from 'api/errors/ArgumentError'
import { Json } from 'gql/index'
import { CATEGORIES_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'

const onboardingUpdateCategories = createPrivateResolver(
  'Mutation:onboarding:updateCategories',
  async ({ scope, args: { categories } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== CATEGORIES_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      categories: categories.map((x: string) => JSON.parse(x)),
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingUpdateCategories: field
    .ofType(OnboardingType)
    .args(arg => ({
      categories: arg.listOf(Json),
    }))
    .resolve(onboardingUpdateCategories),
}))
