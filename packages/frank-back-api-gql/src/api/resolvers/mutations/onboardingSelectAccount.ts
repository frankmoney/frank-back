import { throwArgumentError } from 'api/errors/ArgumentError'
import { ACCOUNT_STEP, ACCOUNTS_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'
import R from 'ramda'

const onboardingSelectAccount = createPrivateResolver(
  'Mutation:onboarding:selectAccount',
  async ({ scope, args: { accountGuid } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNTS_STEP) {
      return throwArgumentError()
    }

    const mxAccount = R.find(
      R.propEq('guid', accountGuid),
      existingOnboarding.accounts,
    )

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      step: ACCOUNT_STEP,
      account: {
        ...mxAccount,
        frankTitle: null,
        frankDescription: null,
      },
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingSelectAccount: field
    .ofType(OnboardingType)
    .args(arg => ({
      accountGuid: arg.ofString(),
    }))
    .resolve(onboardingSelectAccount),
}))
