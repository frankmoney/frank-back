import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { ACCOUNT_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

const onboardingSelectAccount = createPrivateResolver(
  'Mutation:onboarding:selectAccount',
  async ({ user, args: { accountGuid }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    const mxAccount = R.find(
      R.propEq('guid', accountGuid),
      existingOnboarding.accounts,
    )

    const updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: existingOnboarding.id },
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
