import assertAccountAccess from 'app/assertAccountAccess'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'inbox',
  async ({
    args: { accountId, first, after },
    user,
    prisma: { query },
    info,
  }) => {
    await assertAccountAccess(user.id, accountId, { query })

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
