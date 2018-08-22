import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'createStory',
  ({ assert, args, prisma: { mutation }, info }) => {
    // await assert.accountAccess(accountId)  ..later

    return mutation.createStory(
      {
        data: {
          title: args.title,
          body: JSON.parse(args.body),
          coverImage: JSON.parse(args.coverImage),
          account: { connect: { id: args.accountId } },
        },
      },
      info
    )
  }
)
