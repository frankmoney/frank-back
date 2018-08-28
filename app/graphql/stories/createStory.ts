import createPrivateResolver from 'utils/createPrivateResolver'
import _ from 'lodash'

export default createPrivateResolver(
  'createStory',
  ({ assert, args, prisma: { mutation }, info }) => {

    // await assert.accountAccess(accountId)  ..later

    const data: any = {
      title: args.title,
      body: JSON.parse(args.body),
      coverImage: JSON.parse(args.coverImage),
      account: { connect: { id: args.accountId } },
    }

    if (args.paymentsIds) {

      data.payments = {
        connect: _.map(args.paymentsIds, (id) => ({ id })),
      }
    }

    return mutation.createStory(
      { data },
      info,
    )
  },
)
