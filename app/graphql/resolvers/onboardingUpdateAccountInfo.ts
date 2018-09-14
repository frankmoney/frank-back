import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { ACCOUNT_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingUpdateAccountInfo = createPrivateResolver(
  'Mutation:onboarding:updateAccountInfo',
  async ({
           user,
           args: { title, description },
           prisma,
         }) => {

    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: existingOnboarding.id },
      data: {
        step: ACCOUNT_STEP,
        account: {
          ...existingOnboarding.account,
          frankTitle: title || existingOnboarding.account.frankTitle,
          frankDescription: description || existingOnboarding.account.frankDescription,
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
