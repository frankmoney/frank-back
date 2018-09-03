const { gqlObject, gqlList, gqlString, gqlID, gqlFloat } = require('../typeHelpers.js')

module.exports = gqlObject({
  name: 'Payment',
  fields: {
    id: gqlID,
    amount: gqlFloat,
    peerName: gqlString,
  },
})
