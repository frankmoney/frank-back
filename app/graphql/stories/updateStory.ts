import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'updateStory',
  async ({ assert, args, prisma: { query, mutation }, info }) => {
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
      '{ id }'
    ))[0]

    if (!story) {
      throwNotFound()
    }

    // await assert.accountAccess(accountId)  ..later

    return mutation.updateStory(
      {
        where: { id: storyId },
        data: {
          title: args.title,
          body: args.body && JSON.parse(args.body),
          coverImage: args.coverImage && JSON.parse(args.coverImage),
        },
      },
      info
    )
  }
)
