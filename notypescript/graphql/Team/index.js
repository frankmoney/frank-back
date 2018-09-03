const { gqlObject, gqlList, gqlString, gqlID } = require('../typeHelpers.js')
const AccountType = require('../Account')

module.exports = gqlObject({
  name: 'Team',
  fields: {
    id: gqlID,
    name: gqlString,
  },
})
