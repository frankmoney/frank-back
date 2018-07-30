import {ApolloServer} from 'apollo-server'
import {importSchema} from 'graphql-import'
import {makeExecutableSchema} from 'graphql-tools'
import {Prisma} from 'prisma-binding'

const typeDefs = importSchema('app/graphql/schema.graphql')

const resolvers = {
    Query: {
        me: async (_, args, context, info) => {
            const result = await context.prisma.query.users({
                first: 1
            }, info)

            return result[0]
        }
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers})

const server = new ApolloServer(
    {
        schema,
        context() {
            return {
                prisma: new Prisma({
                    typeDefs: 'app/graphql/generated_prisma_schema.graphql',
                    endpoint: 'http://prisma.frank-dev1.frank.ly/',
                })
            }
        },
    }
)

server.listen().then(({url}) => {
    console.log(`Listening at ${url}`)
})