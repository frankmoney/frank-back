import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'inbox',
  async ({
    assert,
    args: { accountId, first, after },
    user,
    prisma: { query },
    info,
  }) => {
    await assert.accountAccess(accountId)

    const payments = await query.payments(
      {
        where: {
          account: {
            id: accountId,
          },
        },
        orderBy: 'postedDate_DESC',
        first,
        after,
      },
      info
    )

    return payments
  }
)
