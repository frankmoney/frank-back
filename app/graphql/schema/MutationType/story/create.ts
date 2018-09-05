import { StoryCreateInput } from 'app/graphql/generated/prisma'
import StoryType from 'app/graphql/schema/StoryType'
import { ID, String, Json } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

const storyCreate = createPrivateResolver(
  'Mutation:story:create',
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
  },
)


export default (field: any) => field
  .ofType(StoryType)
  .args((arg: any) => ({
    accountId: arg.ofType(ID),
    title: arg.ofType(String),
    body: arg.ofType(Json),
    coverImage: arg.ofType(Json).nullable(),
    paymentsIds: arg.listOf(ID).nullable(),
  }))
  .resolve(storyCreate)
