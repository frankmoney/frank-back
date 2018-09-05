import { StoryCreateInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

export default createPrivateResolver(
  'storiesCreate',
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

    return mutation.createStory({ data })
  },
)
