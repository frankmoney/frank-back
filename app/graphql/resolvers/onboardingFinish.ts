import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import AccountType from 'app/graphql/schema/AccountType/AccountType'
import { COMPLETED_STEP } from 'app/onboarding/constants'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const FRANK_TEMA_ID = 'cjk8djl16000h07164aewu80g'

const onboardingFinish = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({
           user,
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
        step: COMPLETED_STEP,
      },
    })

    const name = updatedOnboarding.account.frankTitle
      || updatedOnboarding.account.name

    const account = await prisma.mutation.createAccount({
      data: {
        name,
        rawData: updatedOnboarding.account,
        team: { connect: { id: FRANK_TEMA_ID } },
      },
    })

    return account
  },
)

export default createMutations(field => ({
  onboardingFinish: field
    .ofType(AccountType)
    .resolve(onboardingFinish),
}))
