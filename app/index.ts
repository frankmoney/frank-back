import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import { Prisma } from "prisma-binding";
import { resolvers, typeDefs } from "app/graphql";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context() {
    return {
      prisma: new Prisma({
        typeDefs: "app/graphql/generated/prisma.graphql",
        endpoint: process.env.PRISMA_ENDPOINT
      })
    };
  }
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Listening at ${url}`);
});
