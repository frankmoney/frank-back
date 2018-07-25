import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema'

const app = express();

const apolloServer = new ApolloServer({schema});

app.get('/', function (req, res) {
  res.send('Hello World')
});

apolloServer.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`)
);