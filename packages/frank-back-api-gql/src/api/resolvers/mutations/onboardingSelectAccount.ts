import R from 'ramda'
import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { ACCOUNT_STEP, ACCOUNTS_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingSelectAccount = createPrivateResolver(
  'Mutation:onboarding:selectAccount',
  async ({ scope, args: { accountGuid } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNTS_STEP) {
      return throwArgumentError()
    }

    const mxAccount = R.find(
      R.propEq('guid', accountGuid),
      existingOnboarding.accounts
    )

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          step: ACCOUNT_STEP,
          account: {
            ...mxAccount,
            frankTitle: null,
            frankDescription: null,
          },
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  onboardingSelectAccount: field
    .ofType(OnboardingType)
    .args(arg => ({
      accountGuid: arg.ofString(),
    }))
    .resolve(onboardingSelectAccount),
}))
