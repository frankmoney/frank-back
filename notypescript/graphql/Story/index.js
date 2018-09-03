const { gqlObject, gqlList, gqlString, gqlID, gqlJson } = require('../typeHelpers.js')
const PaymentType = require('../Payment')

module.exports = gqlObject({
  name: 'Story',
  fields: {
    id: gqlID,
    title: gqlString,
    body: gqlJson,
    payments: {
      type: gqlList(PaymentType),
      resolve: (_, {}, { prisma: { query } }) => {
        return _.payments
      },
    },
  },
})
