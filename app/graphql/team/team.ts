import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(async ({ user, prisma: { query } }) => {
  const ownProfile = await query.user(
    {
      where: {
        id: user.id,
      },
    },
    '{ id, email, lastName, firstName }'
  )

  const otherProfiles: any[] = []

  return {
    ownProfile,
    otherProfiles,
  }
})
