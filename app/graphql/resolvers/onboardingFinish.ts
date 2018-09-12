import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import AccountType from 'app/graphql/schema/AccountType/AccountType'
import { COMPLETED_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const FRANK_TEMA_ID = 'cjk8djl16000h07164aewu80g'

const onboardingFinish = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({
           user,
           prisma,
         }) => {

    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: existingOnboarding.id },
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
