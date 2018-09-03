const { gqlObject, gqlList, gqlString, gqlID } = require('../typeHelpers.js')
const AccountType = require('../Account')

module.exports = {
  type: gqlList(AccountType),
  resolve: (_, {}, { prisma: { query } }) => {
    return query.accounts({}, '{ id name }')
  },
}
