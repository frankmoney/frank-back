import { MxUser, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'

const findFreeMxUser = async (institutionCode: string, prisma: Prisma) => {

  console.log('findFreeMxUser')

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

  console.log('createNewMxUser')

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

  console.log('mxUserForInstitution')

  const user = await findFreeMxUser(institutionCode, prisma)

  if (user) {

    console.log('have free mxUser')

    return user
  }
  else {

    console.log('create new mxUser')

    return await createNewMxUser(prisma)
  }
}

const createMxMember = async (
  mxUser: MxUser,
  onboarding: Onboarding,
  credentials: any,
  prisma: Prisma,
) => {

  console.log('createMxMember')

  const institutionCode = onboarding.institution.code

  const { member } = await AtriumClient.createMember({
    params: { userGuid: mxUser.mxGuid },
    body: {
      member: {
        institution_code: institutionCode,
        credentials: credentials.map(JSON.parse),
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

  console.log('enterCredentials')

  const institutionCode = onboarding.institution.code
  credentials = credentials.map(JSON.parse)

  const existingMember = (await prisma.query.mxMembers({
    where: {
      onboarding: { id: onboarding.id },
    },
  }, '{id, mxGuid, institutionCode, user {id, mxGuid}}'))[0]

  if (existingMember) {

    console.log('have existing mxMember')

    await AtriumClient.updateMember({
      params: {
        userGuid: existingMember.user.mxGuid,
        memberGuid: existingMember.mxGuid,
      },
      body: { member: { credentials } },
    })

  } else {

    console.log('create new mxMember')

    const mxUser = await mxUserForInstitution(institutionCode, prisma)

    await createMxMember(mxUser, onboarding, credentials, prisma)
  }

  console.log('end enterCredentials')
}
