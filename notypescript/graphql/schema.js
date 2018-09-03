const graphql = require('graphql')
const QueryType = require('./Query')

module.exports = new graphql.GraphQLSchema({ query: QueryType })
