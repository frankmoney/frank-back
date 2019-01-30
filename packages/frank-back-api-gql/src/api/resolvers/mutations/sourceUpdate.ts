import createMutations from 'utils/createMutations'
import OnboardingCredentialsInput from 'api/schema/OnboardingCredentialsInput'
import SourceStateType, { CHECKING_STATUS } from 'api/schema/SourceStateType'
import OnboardingMfaChallengesInput from '../../schema/OnboardingMfaChallengesInput'
import createPrivateResolver from '../utils/createPrivateResolver'
import getSource from 'api/dal/Source/getSource'

const sourceUpdate = createPrivateResolver(
  'Mutation:sourceUpdate',
  async ({ args: { sourcePid, credentials, challenges }, scope }) => {
    const source = await getSource(
      {
        where: {
          pid: { eq: sourcePid },
        },
      },
      scope
    )

    const { userGuid, memberGuid } = source.data

    if (credentials && credentials.length > 0) {
      await scope.mx.updateMember({
        userGuid,
        memberGuid,
        member: { credentials },
      })
    } else if (challenges && challenges.length > 0) {
      await scope.mx.resumeMemberAggregation({
        userGuid,
        memberGuid,
        member: { challenges },
      })
    }

    return {
      status: CHECKING_STATUS,
    }
  }
)

export default createMutations(field => ({
  sourceUpdate: field
    .ofType(SourceStateType)
    .args(arg => ({
      sourcePid: arg.ofId(),
      credentials: arg.listOf(OnboardingCredentialsInput).nullable(),
      challenges: arg.listOf(OnboardingMfaChallengesInput).nullable(),
    }))
    .resolve(sourceUpdate),
}))
