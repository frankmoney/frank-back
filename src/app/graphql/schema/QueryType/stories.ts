import {
  StoryWhereInput,
  Story,
  StoryOrderByInput,
} from 'app/graphql/generated/prisma'
import { FULL_STORY_QUERY } from 'app/graphql/schema/StoryType'
import { isNil } from 'ramda'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'stories',
  async ({ user, args, prisma: { query } }) => {
    const where: StoryWhereInput = {
      account: {
        team: {
          members_some: {
            user: {
              id: user.id,
            },
          },
        },
      },
    }

    const orderBy: StoryOrderByInput = 'createdAt_DESC'

    const first = args.first

    const skip = args.skip

    if (!isNil(args.isPublished)) {
      where.isPublished = args.isPublished
    }

    const stories = await query.stories<Story[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      FULL_STORY_QUERY
    )

    return stories
  }
)
