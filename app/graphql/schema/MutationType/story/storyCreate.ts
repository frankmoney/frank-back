import R from 'ramda'
import { ID, String, Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { StoryCreateInput } from 'app/graphql/generated/prisma'
import StoryType from 'app/graphql/schema/StoryType'

const storyCreate = createPrivateResolver(
  'Mutation:storyCreate',
  async ({ assert, args, prisma: { mutation } }) => {
    await assert.accountAccess(args.accountId)

    const data: StoryCreateInput = {
      title: args.title,
      body: JSON.parse(args.body),
      coverImage: args.coverImage && JSON.parse(args.coverImage),
      account: { connect: { id: args.accountId } },
    }

    if (args.paymentsIds) {
      data.payments = {
        connect: R.map(id => ({ id }), args.paymentsIds),
      }
    }

    return await mutation.createStory({ data })
  }
)

export default createMutations(field => ({
  storyCreate: field
    .ofType(StoryType)
    .args((arg: any) => ({
      accountId: arg.ofType(ID),
      title: arg.ofType(String),
      body: arg.ofType(Json),
      coverImage: arg.ofType(Json).nullable(),
      paymentsIds: arg.listOf(ID).nullable(),
    }))
    .resolve(storyCreate),
}))
