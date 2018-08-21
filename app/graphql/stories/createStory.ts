import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'createStory',
  ({ assert, args, prisma: { query }, info }) => {

    console.log('Create story with args:')
    console.log(args)

    return {
      id: 'asdczx',
      title: args.title,
      body: args.body,
      coverImage: JSON.parse(args.coverImage),
      account: {
        id: args.accountId,
      },
    }
  },
)
