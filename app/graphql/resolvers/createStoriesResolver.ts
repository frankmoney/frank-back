import { isNil } from 'ramda'
import {
  Story,
  StoryOrderByInput,
  StoryWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createStoriesResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>,
  ) => StoryWhereInput | Promise<StoryWhereInput>,
) =>
  createPrivateResolver(name, async arg => {
    const {
      args,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const orderBy: StoryOrderByInput = 'createdAt_DESC'

    const first = args.first

    const skip = args.skip

    const stories = await query.stories<Story[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      `{ id, title, body, coverImage }`,
    )

    return stories
  })

export default createStoriesResolver
