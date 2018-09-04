import { StoryWhereUniqueInput, Story } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'story',
  async ({ assert, args, prisma: { query } }) => {

    const where: StoryWhereUniqueInput = {
      id: args.id,
    }

    const story = await query.story<Story>({ where })

    return story
  },
)
