import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { ACCOUNT_STEP, CHECKING_STATUS, SUCCESS_STATUS } from 'app/onboarding/constants'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

const onboardingSelectAccount = createPrivateResolver(
  'Mutation:onboarding:selectAccount',
  async ({
           user,
           args: { accountGuid },
           prisma,
         }) => {

    const existingOnboarding = await findExistedOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      throwArgumentError()
    }

    let updatedOnboarding = <Onboarding>existingOnboarding

    const mxAccount = R.find(R.propEq('guid', accountGuid), updatedOnboarding.accounts.items)

    updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: updatedOnboarding.id },
      data: {
        step: ACCOUNT_STEP,
        account: {
          ...mxAccount,
          frankTitle: null,
          frankDescription: null,
        },
      },
    })

    return updatedOnboarding
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
