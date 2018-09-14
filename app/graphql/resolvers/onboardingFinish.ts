import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import AccountType from 'app/graphql/schema/AccountType/AccountType'
import { COMPLETED_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

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

    const categories = existingOnboarding.categories.map((category: any) => ({
      ...category,
      nameNormalized: normalizeString(category.name),
    }))

    const name = existingOnboarding.account.frankTitle
      || existingOnboarding.account.name

    const account = await prisma.mutation.createAccount({
      data: {
        name,
        rawData: existingOnboarding.account,
        team: { connect: { id: FRANK_TEMA_ID } },
        categories: { create: categories },
      },
    })


    await prisma.mutation.updateOnboarding({
      where: { id: existingOnboarding.id },
      data: {
        step: COMPLETED_STEP,
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
