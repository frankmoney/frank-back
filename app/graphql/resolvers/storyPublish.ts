import { Bool, ID } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { throwNotFound } from 'app/errors/NotFoundError'
import StoryType, { FULL_STORY_QUERY } from 'app/graphql/schema/StoryType'
import R from 'ramda'

const storyPublish = createPrivateResolver(
  'Mutation:storyPublish',
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
      FULL_STORY_QUERY,
    ))[0]

    if (!story) {
      return throwNotFound()
    }

    await assert.accountAccess(accountId)

    let updatedStory

    if (args.isPublished) {

      if (story.publicData) {

        await mutation.deleteStoryData({
          where: { id: story.publicData.id },
        })
      }

      updatedStory = await mutation.updateStory({
        where: { id: storyId },
        data: {
          isPublished: true,
          publicData: {
            create: {
              title: story.draftData.title,
              body: story.draftData.body,
              coverImage: story.draftData.coverImage,
              payments: {
                connect: story.draftData.payments,
              },
            },
          },
        },
      }, FULL_STORY_QUERY)
    }
    else {

      updatedStory = await mutation.updateStory({
        where: { id: storyId },
        data: {
          isPublished: false,
        },
      }, FULL_STORY_QUERY)
    }

    return updatedStory
  },
)

export default createMutations(field => ({
  storyPublish: field
    .ofType(StoryType)
    .args((arg: any) => ({
      accountId: arg.ofType(ID),
      storyId: arg.ofType(ID),
      isPublished: arg.ofType(Bool),
    }))
    .resolve(storyPublish),
}))
