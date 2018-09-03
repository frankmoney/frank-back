const { gqlObject, gqlList, gqlString, gqlID, gqlInt, paginationArgs } = require('../typeHelpers.js')
const StoryType = require('../Story')


module.exports = {
  type: gqlList(StoryType),
  args: {
    ...paginationArgs,
  },
  resolve: (_, args, { prisma: { query } }) => {

    return query.stories(args, '{ id title body }')
  },
}
