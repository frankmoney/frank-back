import MxUser from 'store/types/MxUser'
import Onboarding from 'store/types/Onboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createUser from 'api/dal/mx/createUser'
import createMember from 'api/dal/mx/createMember'
import getMemberById from 'api/dal/mx/getMemberById'
import OnboardingScope from './OnboardingScope'

const LOGGER_PREFIX = 'app:onboarding:enterCredentials'

const createNewMxUser = async (scope: OnboardingScope) => {
  const log = scope.logFor(`${LOGGER_PREFIX}:createNewMxUser`)

  log.trace('start')

  const { user } = await scope.mx.createUser({
    user: {
      metadata: JSON.stringify({
        first_name: 'auto_generated_user',
      }),
    },
  })

  return await createUser({ guid: user.guid }, scope)
}

const createMxMember = async (
  mxUser: MxUser,
  onboarding: Onboarding,
  credentials: any,
  scope: OnboardingScope
) => {
  const log = scope.logFor(`${LOGGER_PREFIX}:createMxMember`)

  log.trace('start')

  const institutionCode = onboarding.institution.code

  const { member } = await scope.mx.createMember({
    userGuid: mxUser.mxGuid,
    member: {
      institution_code: institutionCode,
      credentials,
    },
  })

  const mxMember = await createMember(
    {
      guid: member.guid,
      mxUserId: mxUser.id,
      institutionCode,
    },
    scope
  )

  await updateOnboardingByPid(
    {
      pid: onboarding.pid,
      mxMemberId: mxMember.id,
    },
    scope
  )

  return mxMember
}

export default async (
  onboarding: Onboarding,
  scope: OnboardingScope,
  credentials: any
) => {
  const log = scope.logFor(LOGGER_PREFIX)

  log.trace('start')

  const existingMxMember = await getMemberById(
    { id: onboarding.mxMemberId },
    scope
  )

  if (existingMxMember) {
    log.trace('have member - update credentials')

    await scope.mx.updateMember({
      userGuid: existingMxMember.mxUser.mxGuid,
      memberGuid: existingMxMember.mxGuid,
      member: { credentials },
    })
  } else {
    log.trace("don't have member - create new")

    const mxUser = await createNewMxUser(scope)

    await createMxMember(mxUser, onboarding, credentials, scope)
  }

  log.trace('end')
}
