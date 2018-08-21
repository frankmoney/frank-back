import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'me',
  async ({ user, prisma: { query } }) => {
    if (user && user.id) {
      return await query.user(
        { where: { id: user.id } },
        `{ id, email, firstName, lastName }`
      )
    } else {
      return null
    }
  }
)
