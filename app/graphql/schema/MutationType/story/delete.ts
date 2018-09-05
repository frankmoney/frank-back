import StoryType from 'app/graphql/schema/StoryType'
import { ID } from 'gql'
import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'

const storyDelete = createPrivateResolver(
  'Mutation:story:delete',
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
      '{ id }',
    ))[0]

    if (!story) {
      throwNotFound()
    }

    await assert.accountAccess(accountId)

    return await mutation.deleteStory({
      where: { id: storyId },
    })
  },
)

export default (field: any) => field
  .ofType(StoryType)
  .args((arg: any) => ({
    accountId: arg.ofType(ID),
    storyId: arg.ofType(ID),
  }))
  .resolve(storyDelete)
