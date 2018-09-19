import { MxUser, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import createLogger from 'utils/createLogger'

const LOGGER_PREFIX = 'app:onboarding:enterCredentials'

const findFreeMxUser = async (institutionCode: string, prisma: Prisma) => {

  const log = createLogger(`${LOGGER_PREFIX}:findFreeMxUser`)

  log.debug('start')

  const users = await prisma.query.mxUsers({
    where: {
      NOT: {
        members_some: {
          institutionCode,
        },
      },
    },
  })

  return users[0]
}

const createNewMxUser = async (prisma: Prisma) => {

  const log = createLogger(`${LOGGER_PREFIX}:createNewMxUser`)

  log.debug('start')

  const { user } = await AtriumClient.createUser({
    body: {
      user: {
        metadata: '{"first_name": "auth_generated_user"}',
      },
    },
  })

  return await prisma.mutation.createMxUser({
    data: {
      mxGuid: user.guid,
    },
  })
}

const mxUserForInstitution = async (institutionCode: string, prisma: Prisma) => {

  const log = createLogger(`${LOGGER_PREFIX}:mxUserForInstitution`)

  log.debug('start')

  const user = await findFreeMxUser(institutionCode, prisma)

  if (user) {

    log.debug('have free mxUser')

    return user
  }
  else {

    log.debug('don\'t have free mxUser')

    return await createNewMxUser(prisma)
  }
}

const createMxMember = async (
  mxUser: MxUser,
  onboarding: Onboarding,
  credentials: any,
  prisma: Prisma,
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

  return await prisma.mutation.createMxMember({
    data: {
      mxGuid: member.guid,
      institutionCode,
      user: { connect: { id: mxUser.id } },
      onboarding: { connect: { id: onboarding.id } },
    },
  })
}

export default async (
  onboarding: Onboarding,
  prisma: Prisma,
  credentials: any,
) => {

  const log = createLogger(LOGGER_PREFIX)

  log.debug('start')

  const institutionCode = onboarding.institution.code
  credentials = credentials.map((x: string) => JSON.parse(x))

  const existingMember = (await prisma.query.mxMembers({
    where: {
      onboarding: { id: onboarding.id },
    },
  }, '{id, mxGuid, institutionCode, user {id, mxGuid}}'))[0]

  if (existingMember) {

    log.debug('have member - update credentials')

    await AtriumClient.updateMember({
      params: {
        userGuid: existingMember.user.mxGuid,
        memberGuid: existingMember.mxGuid,
      },
      body: { member: { credentials } },
    })

  } else {

    log.debug('don\'t have member - create new')

    const mxUser = await mxUserForInstitution(institutionCode, prisma)

    await createMxMember(mxUser, onboarding, credentials, prisma)
  }

  log.debug('end')
}
