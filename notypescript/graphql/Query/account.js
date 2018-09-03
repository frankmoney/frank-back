const { gqlObject, gqlNonNull, gqlList, gqlString, gqlID } = require('../typeHelpers.js')
const AccountType = require('../Account')

module.exports = {
  type: AccountType,
  args: {
    id: gqlNonNull(gqlID),
  },
  resolve: async (_, { id }, { prisma: { query } }) => {
    return query.account({ where: { id } }, '{ id name payments {id peerName amount}}')
  },
}
