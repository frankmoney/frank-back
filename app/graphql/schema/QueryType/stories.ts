import {
  StoryWhereInput,
  Story,
  StoryOrderByInput,
} from 'app/graphql/generated/prisma'
import { isNil } from 'ramda'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'stories',
  async ({ user, args, prisma: { query } }) => {
    const where: StoryWhereInput = {
      account: {
        members_some: {
          teamMember: {
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

    const stories = await query.stories<Story[]>({
      where,
      orderBy,
      first,
      skip,
    })

    return stories
  }
)
