const graphql = require('graphql')
const R = require('ramda')
const GraphQLJSON = require('graphql-type-json')

const gqlList = (type) => new graphql.GraphQLList(type)
const gqlNonNull = (type) => new graphql.GraphQLNonNull(type)
const gqlID = graphql.GraphQLID
const gqlString = graphql.GraphQLString
const gqlInt = graphql.GraphQLInt
const gqlFloat = graphql.GraphQLFloat
const gqlJson = GraphQLJSON

const gqlObject = (params) => {

  const isJustType = (type) => !type.type

  params.fields = R.map((value) => {
    value = isJustType(value) ? { type: value } : value
    value.args = R.map((value) => {
      return isJustType(value) ? { type: value } : value
    }, value.args || {})
    return value

  }, params.fields)

  return new graphql.GraphQLObjectType(params)
}

const paginationArgs = {
  first: gqlInt,
  skip: gqlInt,
}

module.exports = {
  gqlID,
  gqlNonNull,
  gqlString,
  gqlFloat,
  gqlInt,
  gqlJson,
  gqlObject,
  gqlList,
  paginationArgs,
}
