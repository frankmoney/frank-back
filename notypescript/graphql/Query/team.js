const { gqlObject, gqlList, gqlString, gqlID } = require('../typeHelpers.js')
const TeamType = require('../Team')

module.exports = {
  type: TeamType,
  resolve: async (_, { id }, { prisma: { query } }) => {
    return (await query.teams({}, '{ id name }'))[0]
  },
}
