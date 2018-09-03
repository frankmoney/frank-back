const { gqlObject, gqlList, gqlString, gqlID, gqlInt, paginationArgs } = require('../typeHelpers.js')
const PaymentType = require('../Payment')

module.exports = gqlObject({
  name: 'Account',
  fields: {
    id: gqlID,
    name: gqlString,
    payments: {
      type: gqlList(PaymentType),
      args: {
        ...paginationArgs,
      },
      resolve: (_, args, { prisma: { query } }) => {
        return query.payments(args, '{id amount peerName}')
      },
    },
  },
})
