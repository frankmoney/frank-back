import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'stories',
  async ({ assert, args, prisma: { query }, info }) => {

    const accountId = args.accountId

    await assert.accountAccess(accountId)

    query.teamMembers({
      where: {
        account: {
          id: accountId,
        },
      },
    }, info)
  },
)
