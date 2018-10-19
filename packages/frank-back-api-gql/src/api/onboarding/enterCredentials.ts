import getMemberById from 'api/dal/mx/getMemberById'
import createUser from 'api/dal/mx/createUser'
import createMember from 'api/dal/mx/createMember'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import AtriumClient from './atriumClient'
import DefaultActionScope from 'api/dal/DefaultActionScope'
import Onboarding from 'store/types/Onboarding'
import MxUser from 'store/types/MxUser'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})

const LOGGER_PREFIX = 'app:onboarding:enterCredentials'

const createNewMxUser = async (scope: DefaultActionScope) => {
  const log = createLogger(`${LOGGER_PREFIX}:createNewMxUser`)

  log.debug('start')

  const { user } = await AtriumClient.createUser({
    body: {
      user: {
        metadata: '{"first_name": "auto_generated_user"}',
      },
    },
  })

  return await createUser({ guid: user.guid }, scope)
}

const mxUserForInstitution = async (
  institutionCode: string,
  scope: DefaultActionScope,
) => {
  const log = createLogger(`${LOGGER_PREFIX}:mxUserForInstitution`)

  log.debug('start')

  // const mxUser = await findFreeUser({institutionCode}, scope)
  const mxUser = null

  if (mxUser) {
    log.debug('have free mxUser')

    return mxUser
  } else {
    log.debug('don\'t have free mxUser')

    return await createNewMxUser(scope)
  }
}

const createMxMember = async (
  mxUser: MxUser,
  onboarding: Onboarding,
  credentials: any,
  scope: DefaultActionScope,
) => {
  const log = createLogger(`${LOGGER_PREFIX}:createMxMember`)

  log.debug('start')

  const institutionCode = onboarding.institution.code

  const { member } = await AtriumClient.createMember({
    params: { userGuid: mxUser.mxGuid },
    body: {
      member: {
        institution_code: institutionCode,
        credentials,
      },
    },
  })

  const mxMember = await createMember({
    guid: member.guid,
    mxUserId: mxUser.id,
    institutionCode,
  }, scope)

  await updateOnboardingByPid({
    pid: onboarding.pid,
    mxMemberId: mxMember.id,
  }, scope)

  return mxMember
}

export default async (
  onboarding: Onboarding,
  scope: DefaultActionScope,
  credentials: any,
) => {
  const log = createLogger(LOGGER_PREFIX)

  log.debug('start')

  const institutionCode = onboarding.institution.code
  credentials = credentials.map((x: string) => JSON.parse(x))

  const existingMxMember = await getMemberById({ id: onboarding.mxMemberId }, scope)

  if (existingMxMember) {
    log.debug('have member - update credentials')

    await AtriumClient.updateMember({
      params: {
        userGuid: existingMxMember.mxUser.mxGuid,
        memberGuid: existingMxMember.mxGuid,
      },
      body: { member: { credentials } },
    })
  } else {
    log.debug('don\'t have member - create new')

    const mxUser = await mxUserForInstitution(institutionCode, scope)

    await createMxMember(mxUser, onboarding, credentials, scope)
  }

  log.debug('end')
}
