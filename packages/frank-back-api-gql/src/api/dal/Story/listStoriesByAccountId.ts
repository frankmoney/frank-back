import { Sql, join, sql, limit } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story } from 'store/names'
import Id from 'store/types/Id'
import Story from 'store/types/Story'
import StoriesOrder from 'api/types/StoriesOrder'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  take?: number
  skip?: number
  orderBy: StoriesOrder
}

export default createQuery<Args, Story[]>(
  'listStoriesByAccountId',
  (args, { db }) => {
    const orderBySqls: Sql[] = []

    switch (args.orderBy) {
      case 'createdAt_DESC':
        orderBySqls.push(
          sql`${story}.${story.createdAt} desc`,
          sql`${story}.${story.id} desc`
        )
        break
      case 'publishedAt_DESC':
        orderBySqls.push(
          sql`${story}.${story.publishedAt} desc`,
          sql`${story}.${story.createdAt} desc`,
          sql`${story}.${story.id} desc`
        )
        break
      default:
        throw new Error(`Unknown story order: ${args.orderBy}`)
    }

    const orderBySql = join(orderBySqls, ', ')

    return db.query(
      sql`
        select
          ${story}.${story.id},
          ${story}.${story.pid},
          ${story}.${story.createdAt},
          ${story}.${story.creatorId},
          ${story}.${story.updatedAt},
          ${story}.${story.updaterId},
          ${story}.${story.publishedAt},
          ${story}.${story.title},
          ${story}.${story.cover},
          ${story}.${story.body},
          ${story}.${story.accountId}
        from ${story}
        where ${story}.${story.accountId} = ${args.accountId}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapStory
    )
  }
)
