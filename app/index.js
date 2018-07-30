import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'

const typeDefs = importSchema('app/schema.graphql')

const resolvers = {
  Query: {
    posts(parent, { search }, { prisma }, info) {
      return prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: search },
              { content_contains: search },
            ],
          },
        },
        info,
      )
    },
    user(parent, { id }, { prisma }, info) {
      return prisma.query.user(
        {
          where: {
            id,
          },
        },
        info,
      )
    },
  },
  Mutation: {
    createDraft: (parent, { title, content, authorId }, { prisma }, info) => {
      return prisma.mutation.createPost(
        {
          data: {
            title,
            content,
            author: {
              connect: {
                id: authorId,
              },
            },
          },
        },
        info,
      )
    },
    publish: (parent, { id }, { prisma }, info) => {
      return prisma.mutation.updatePost(
        {
          where: {
            id,
          },
          data: {
            published: true,
          },
        },
        info,
      )
    },
    deletePost: (parent, { id }, context, info) => {
      return prisma.mutation.deletePost(
        {
          where: {
            id,
          },
        },
        info,
      )
    },
    signup: (parent, { name }, { prisma }, info) => {
      return prisma.mutation.createUser(
        {
          data: {
            name,
          },
        },
        info,
      )
    }
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer(
  {
    schema,
    context() {
      return {
        prisma: new Prisma({
          typeDefs: 'app/generated/prisma.graphql',
          endpoint: 'http://127.0.0.1:4466',
        })
      }
    },
  }
)

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`)
})
