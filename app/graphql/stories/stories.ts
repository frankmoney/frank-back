import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'stories',
  ({ assert, args, prisma: { query }, info }) => {

    const accountId = args.accountId

    // check user access ?

    return [
      {
        id: 'asd',
        title: 'How is this different from GraphiQL?',
        body: 'GraphQL Playground uses components of GraphiQL under the hood but is meant as a more powerful GraphQL IDE enabling better (local) development workflows. Compared to GraphiQL, the GraphQL Playground ships with the following additional features.',
        coverImage: { original: 'url', preview: 'url' },
        account: { id: accountId },
      },
      {
        id: 'qwe',
        title: 'As React Component',
        body: 'GraphQL Playground provides a React component responsible for rendering the UI and Session management. There are 3 dependencies needed in order to run the graphql-playground-react React component.',
        coverImage: { original: 'url', preview: 'url' },
        account: { id: accountId },
      },
      {
        id: 'zxc',
        title: 'How does GraphQL Bin work?',
        body: 'You can easily share your Playgrounds with others by clicking on the "Share" button and sharing the generated link. You can think about GraphQL Bin like Pastebin for your GraphQL queries including the context (endpoint, HTTP headers, open tabs etc).',
        coverImage: { original: 'url', preview: 'url' },
        account: { id: accountId },
      },
    ]
  },
)
