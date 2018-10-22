import getMemberById from 'api/dal/mx/getMemberById'
import AtriumClient from './atriumClient'
import DefaultActionScope from 'api/dal/DefaultActionScope'
import Onboarding from 'store/types/Onboarding'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})
const LOGGER_PREFIX = 'app:onboarding:enterMfaChallenges'

export default async (
  onboarding: Onboarding,
  scope: DefaultActionScope,
  challengesJson: string[]
) => {
  const log = createLogger(LOGGER_PREFIX)

  log.debug('start')

  const challenges = challengesJson.map(x => JSON.parse(x))

  const existingMxMember = await getMemberById(
    { id: onboarding.mxMemberId },
    scope
  )

  if (existingMxMember) {
    await AtriumClient.resumeMemberAggregation({
      params: {
        userGuid: existingMxMember.mxUser.mxGuid,
        memberGuid: existingMxMember.mxGuid,
      },
      body: { member: { challenges } },
    })
  } else {
    log.debug("don't have member")
  }
}
