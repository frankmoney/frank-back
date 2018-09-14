import R from 'ramda'
import { ID, String, Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { StoryCreateInput, StoryDataCreateOneWithoutDraftStoryInput } from 'app/graphql/generated/prisma'
import StoryType, { FULL_STORY_QUERY } from 'app/graphql/schema/StoryType'

const storyCreate = createPrivateResolver(
  'Mutation:storyCreate',
  async ({ assert, args, prisma: { mutation } }) => {
    await assert.accountAccess(args.accountId)

    const draftData: StoryDataCreateOneWithoutDraftStoryInput = {
      create: {
        title: args.title,
        body: JSON.parse(args.body),
        coverImage: args.coverImage && JSON.parse(args.coverImage),
      },
    }

    const data: StoryCreateInput = {
      account: { connect: { id: args.accountId } },
      draftData,
    }

    if (args.paymentsIds) {
      draftData.create!.payments = {
        connect: R.map(id => ({ id }), args.paymentsIds),
      }
    }

    return await mutation.createStory({ data }, FULL_STORY_QUERY)
  },
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
