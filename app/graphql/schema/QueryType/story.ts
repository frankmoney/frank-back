import { StoryWhereUniqueInput, Story } from 'app/graphql/generated/prisma'
import { FULL_STORY_QUERY } from 'app/graphql/schema/StoryType'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'story',
  async ({ assert, args, prisma: { query } }) => {
    const where: StoryWhereUniqueInput = {
      id: args.id,
    }

    const story = await query.story<Story>({ where }, FULL_STORY_QUERY)

    return story
  }
)
