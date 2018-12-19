import { Sql, join, sql, literal } from 'sql'
import { story } from 'store/names'

const storyFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${story.id}"`,
      sql`"${alias$}"."${story.pid}"`,
      sql`"${alias$}"."${story.createdAt}"`,
      sql`"${alias$}"."${story.creatorId}"`,
      sql`"${alias$}"."${story.updatedAt}"`,
      sql`"${alias$}"."${story.updaterId}"`,
      sql`"${alias$}"."${story.publishedAt}"`,
      sql`"${alias$}"."${story.cover}"`,
      sql`"${alias$}"."${story.title}"`,
      sql`"${alias$}"."${story.body}"`,
      sql`"${alias$}"."${story.accountId}"`,
    ],
    ',\r\n'
  )
}

export default storyFieldsSql
