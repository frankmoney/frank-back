import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'stories',
  async ({ assert, args, prisma: { query }, info }) => {

    const accountId = args.accountId

    // await assert.accountAccess(accountId)  ..later

    return query.stories({
      where: {
        account: {
          id: accountId,
        },
      },
    }, info)
  },
)
