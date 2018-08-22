import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'deleteStory',
  async ({ assert, args, prisma: { query, mutation }, info }) => {

    const accountId = args.accountId
    const storyId = args.storyId

    const story = (await query.stories({
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
    }, '{ account { id } }'))[0]

    if (!story) {
      throwNotFound()
    }

    // await assert.accountAccess(accountId)  ..later

    return mutation.deleteStory({
      where: { id: storyId },
    }, info)
  },
)
