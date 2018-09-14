import { Bool, ID } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { throwNotFound } from 'app/errors/NotFoundError'
import StoryType from 'app/graphql/schema/StoryType'
import R from 'ramda'

const storyDelete = createPrivateResolver(
  'Mutation:storyDelete',
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
      '{ id, draftData }',
    ))[0]

    if (!story) {
      return throwNotFound()
    }

    await assert.accountAccess(accountId)

    if (args.isPublished) {
      await mutation.createStoryData({
        data: {
          publicStory: { connect: { id: storyId } },
          title: story.draftData.title,
          body: story.draftData.body,
          coverImage: story.draftData.coverImage,
        },
      })
    }

    return await query.story({ where: { id: story.id } })
  },
)

export default createMutations(field => ({
  storyDelete: field
    .ofType(StoryType)
    .args((arg: any) => ({
      accountId: arg.ofType(ID),
      storyId: arg.ofType(ID),
      isPublished: arg.ofType(Bool),
    }))
    .resolve(storyDelete),
}))
