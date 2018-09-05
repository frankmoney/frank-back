import { throwNotFound } from 'app/errors/NotFoundError'
import { StoryUpdateInput } from 'app/graphql/generated/prisma'
import StoryType from 'app/graphql/schema/StoryType'
import { ID, String, Json } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

const storyUpdate = createPrivateResolver(
  'Mutation:story:update',
  async ({ assert, args, prisma: { query, mutation } }) => {

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
      '{ id, payments { id } }',
    ))[0]

    if (!story) {
      throwNotFound()
    }

    await assert.accountAccess(accountId)

    const data: StoryUpdateInput = {
      title: args.title,
      body: args.body && JSON.parse(args.body),
      coverImage: args.coverImage && JSON.parse(args.coverImage),
    }

    if (args.paymentsIds) {
      const currentPaymentsIds = R.map(
        (payment: any) => payment.id,
        story.payments,
      )
      const toConnectPaymentsIds = R.difference(
        args.paymentsIds,
        currentPaymentsIds,
      )
      const toDisconnectPaymentsIds = R.difference(
        currentPaymentsIds,
        args.paymentsIds,
      )

      data.payments = {
        connect: R.map(id => ({ id }), toConnectPaymentsIds),
        disconnect: R.map(id => ({ id }), toDisconnectPaymentsIds),
      }
    }

    return await mutation.updateStory({
      where: { id: storyId },
      data,
    })
  },
)


export default (field: any) => field
  .ofType(StoryType)
  .args((arg: any) => ({
    accountId: arg.ofType(ID),
    storyId: arg.ofType(ID),
    title: arg.ofType(String).nullable(),
    body: arg.ofType(Json).nullable(),
    coverImage: arg.ofType(Json).nullable(),
    paymentsIds: arg.listOf(ID).nullable(),
  }))
  .resolve(storyUpdate)
