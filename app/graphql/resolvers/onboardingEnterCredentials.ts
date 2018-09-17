import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import AtriumClient from 'app/onboarding/atriumClient'
import { CHECKING_STATUS, CREDENTIALS_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import syncOnboardingState from 'app/onboarding/sync'
import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

const onboardingEnterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({ user, args: { credentials }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      throwArgumentError()
    }

    let updatedOnboarding = <Onboarding>existingOnboarding

    updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: updatedOnboarding.id },
      data: {
        step: CREDENTIALS_STEP,
        credentials: {
          ...updatedOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
    })

    // do async stuff: find and sync member or create new member
    ;(() => {
      const institutionCode = updatedOnboarding.institution.code

      AtriumClient.createUser({
        body: {
          user: {
            metadata: '{"first_name": "auth_generated_user"}',
          },
        },
      }).then(({ user: { guid } }: any) => {
        // prisma.mutation
        //   .updateOnboarding({
        //     where: { id: updatedOnboarding.id },
        //     data: {
        //       mxUserGuid: guid,
        //     },
        //   })
        //   .then(() => {
        //     AtriumClient.createMember({
        //       params: { userGuid: guid },
        //       body: {
        //         member: {
        //           institution_code: institutionCode,
        //           credentials: credentials.map(JSON.parse),
        //         },
        //       },
        //     }).then(({ member }: any) => {
        //       prisma.mutation.updateOnboarding({
        //         where: { id: updatedOnboarding.id },
        //         data: {
        //           mxMemberGuid: member.guid,
        //         },
        //       })
        //     })
        //   })
      })
    })()

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingEnterCredentials: field
    .ofType(OnboardingType)
    .args(arg => ({
      credentials: arg.listOf(Json),
    }))
    .resolve(onboardingEnterCredentials),
}))
