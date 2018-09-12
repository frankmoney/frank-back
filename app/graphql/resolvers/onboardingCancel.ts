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

    const existedOnboarding = await findExistedOnboarding(user.id, prisma)

    if (existedOnboarding) {

      if (existedOnboarding.memberGUID) {

        await AtriumClient.deleteMember({
          params: {
            userGuid: MX_TEMP_USER,
            memberGuid: existedOnboarding.memberGUID,
          },
        })
      }

      await prisma.mutation.deleteOnboarding({ where: { id: existedOnboarding.id } })
    }

    return true
  },
)

export default createMutations(field => ({
  onboardingCancel: field.ofBool().resolve(onboardingCancel),
}))
