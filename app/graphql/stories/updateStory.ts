import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'
import _ from 'lodash'

export default createPrivateResolver(
  'updateStory',
  async ({ assert, args, prisma: { query, mutation }, info }) => {
    const accountId = args.accountId
    const storyId = args.storyId

    const story: any = (await query.stories(
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
      '{ id, payments { id } }',
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

      const currentPaymentsIds = _.map(story.payments, (payment) => payment.id)
      const toConnectPaymentsIds = _.difference(args.paymentsIds, currentPaymentsIds)
      const toDisconnectPaymentsIds = _.difference(currentPaymentsIds, args.paymentsIds)

      data.payments = {
        connect: _.map(toConnectPaymentsIds, (id) => ({ id })),
        disconnect: _.map(toDisconnectPaymentsIds, (id) => ({ id })),
      }
    }

    return mutation.updateStory(
      {
        where: { id: storyId },
        data,
      },
      info,
    )
  },
)
