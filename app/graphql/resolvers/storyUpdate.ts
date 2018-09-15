import * as R from 'ramda'
import { ID, String, Json, Bool } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { throwNotFound } from 'app/errors/NotFoundError'
import { StoryUpdateInput } from 'app/graphql/generated/prisma'
import StoryType, { FULL_STORY_QUERY } from 'app/graphql/schema/StoryType'

const storyUpdate = createPrivateResolver(
  'Mutation:storyUpdate',
  async ({ assert, args, prisma: { query, mutation } }) => {
    const accountId = args.accountId
    const storyId = args.storyId

    const story = (await query.stories(
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
      FULL_STORY_QUERY
    ))[0]

    if (!story) {
      throwNotFound()
    }

    await assert.accountAccess(accountId)

    const data = {
      title: args.title,
      body: args.body && JSON.parse(args.body),
      coverImage: args.coverImage && JSON.parse(args.coverImage),
      payments: {},
    }

    if (args.paymentsIds) {
      const currentPaymentsIds = R.map(
        (payment: any) => payment.id,
        story.draftData.payments || []
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

    await mutation.updateStoryData({
      where: { id: story.draftData.id },
      data,
    })

    return await query.story({ where: { id: story.id } }, FULL_STORY_QUERY)
  }
)

export default createMutations(field => ({
  storyUpdate: field
    .ofType(StoryType)
    .args((arg: any) => ({
      accountId: arg.ofType(ID),
      storyId: arg.ofType(ID),
      title: arg.ofType(String).nullable(),
      body: arg.ofType(Json).nullable(),
      coverImage: arg.ofType(Json).nullable(),
      paymentsIds: arg.listOf(ID).nullable(),
    }))
    .resolve(storyUpdate),
}))
