import { throwNotFound } from 'app/errors/NotFoundError'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'deleteStory',
  async ({ assert, args, prisma: { query, mutation }, info }) => {

    const storyId = args.id
    const story = await query.story({ where: { id: storyId } }, '{ account { id } }')

    if (!story) {
      throwNotFound()
    }

    const accountId = story && story.account.id

    // await assert.accountAccess(accountId)  ..later

    return mutation.deleteStory({
      where: { id: storyId },
    }, info)
  },
)
