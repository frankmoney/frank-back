import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'storyDelete',
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

    return mutation.deleteStory({
      where: { id: storyId },
    })
  },
)
