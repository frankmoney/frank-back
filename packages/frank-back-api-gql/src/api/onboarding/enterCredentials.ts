import MxUser from 'store/types/MxUser'
import Onboarding from 'store/types/Onboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createUser from 'api/dal/mx/createUser'
import createMember from 'api/dal/mx/createMember'
import getMemberById from 'api/dal/mx/getMemberById'
import OnboardingScope from './OnboardingScope'
import * as Sentry from '@sentry/node'

const LOGGER_PREFIX = 'app:onboarding:enterCredentials'

const createNewMxUser = async (scope: OnboardingScope) => {
  const log = scope.logFor(`${LOGGER_PREFIX}:createNewMxUser`)

  log.trace('start')

  // TODO metadata

  const { user } = await scope.mx.createUser({
    user: {
      metadata: JSON.stringify({
        first_name: 'auto_generated_user',
      }),
    },
  })

  if (!user || !user.guid) {
    throw new Error("mx.createUser didn't return user")
  }

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

  // TODO metadata

  const { member } = await scope.mx.createMember({
    userGuid: mxUser.mxGuid,
    member: {
      institution_code: institutionCode,
      credentials,
    },
  })

  if (!member || !member.guid) {
    throw new Error("mx.createMember didn't return member")
  }

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

  try {
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
  } catch (e) {
    log.error('Exception: ' + e.toString())
    Sentry.captureException(e)
  }

  log.trace('end')
}
