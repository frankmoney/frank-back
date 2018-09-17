import { Onboarding } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({ user, args: { institutionCode }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (existingOnboarding) {
      try {
        // const {
        //   mxMemberGuid,
        //   mxUserGuid,
        // } = await prisma.mutation.deleteOnboarding<Onboarding>(
        //   { where: { id: existingOnboarding.id } },
        //   '{ mxMemberGuid, mxUserGuid }'
        // )
        //
        // await AtriumClient.deleteMember({
        //   params: {
        //     userGuid: mxUserGuid,
        //     memberGuid: mxMemberGuid,
        //   },
        // })
      } catch (exc) {
        // ignore
      }
    }

    return true
  }
)

export default createMutations(field => ({
  onboardingCancel: field.ofBool().resolve(onboardingCancel),
}))
