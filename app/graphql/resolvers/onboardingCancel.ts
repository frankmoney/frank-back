import { Onboarding } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { MX_TEMP_USER } from 'app/onboarding/constants'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({
           user,
           args: { institutionCode },
           prisma,
         }) => {

    const existingOnboarding = await findExistedOnboarding(user.id, prisma)


    if (existingOnboarding) {

      try {

        const { memberGuid } = await prisma.mutation.deleteOnboarding<Onboarding>({ where: { id: existingOnboarding.id } }, '{ memberGuid }')

        await AtriumClient.deleteMember({
          params: {
            userGuid: MX_TEMP_USER,
            memberGuid,
          },
        })

      } catch (exc) {
        // ignore
      }
    }

    return true
  },
)

export default createMutations(field => ({
  onboardingCancel: field.ofBool().resolve(onboardingCancel),
}))
