import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { ACCOUNT_STEP } from 'app/onboarding/constants'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingUpdateAccountInfo = createPrivateResolver(
  'Mutation:onboarding:updateAccountInfo',
  async ({
           user,
           args: { title, description },
           prisma,
         }) => {

    const existingOnboarding = await findExistedOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      throwArgumentError()
    }

    let updatedOnboarding = <Onboarding>existingOnboarding

    updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: updatedOnboarding.id },
      data: {
        step: ACCOUNT_STEP,
        account: {
          ...updatedOnboarding.account,
          frankTitle: title || updatedOnboarding.account.frankTitle,
          frankDescription: description || updatedOnboarding.account.frankDescription,
        },
      },
    })

    return updatedOnboarding
  },
)

export default createMutations(field => ({
  onboardingUpdateAccountInfo: field
    .ofType(OnboardingType)
    .args(arg => ({
      title: arg.ofString().nullable(),
      description: arg.ofString().nullable(),
    }))
    .resolve(onboardingUpdateAccountInfo),
}))
