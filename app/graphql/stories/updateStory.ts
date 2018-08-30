import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

export default createPrivateResolver(
  'updateStory',
  async ({ assert, args, prisma: { query, mutation }, info }) => {
    const accountId = args.accountId
    const storyId = args.storyId

    const story = (await query.stories<any>(
      {
        where: {
          AND: [
            {
              id: storyId,
            },
            {
              account: {
                id: accountId,
              },
            },
          ],
        },
      },
      '{ id, payments { id } }'
    ))[0]

    if (!story) {
      throwNotFound()
    }

    // await assert.accountAccess(accountId)  ..later

    const data: any = {
      title: args.title,
      body: args.body && JSON.parse(args.body),
      coverImage: args.coverImage && JSON.parse(args.coverImage),
    }

    if (args.paymentsIds) {
      const currentPaymentsIds = R.map(
        (payment: any) => payment.id,
        story.payments
      )
      const toConnectPaymentsIds = R.difference(
        args.paymentsIds,
        currentPaymentsIds
      )
      const toDisconnectPaymentsIds = R.difference(
        currentPaymentsIds,
        args.paymentsIds
      )

      data.payments = {
        connect: R.map(id => ({ id }), toConnectPaymentsIds),
        disconnect: R.map(id => ({ id }), toDisconnectPaymentsIds),
      }
    }

    return mutation.updateStory(
      {
        where: { id: storyId },
        data,
      },
      info
    )
  }
)
