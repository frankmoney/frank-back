import Id from 'store/types/Id'
import Scope from 'api/Scope'
import parse from 'csv-parse/lib/sync'
import fs from 'fs'
import { sql } from 'sql'
import { SystemUserId } from 'store/enums'
import { payment } from 'store/names'
import createAccount from 'api/dal/Account/createAccount'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import { subDays } from 'date-fns'
import { createCategory, findCategory, isTrue } from './helpers'

export default async (scope: Scope) => {
  const team = await getTeamByUserId({ userId: scope.user!.id }, scope)

  const account = await createAccount(
    {
      teamId: team.id,
      name: 'Demo account',
      description: 'Demo account description',
      currencyCode: 'USD',
      creatorId: SystemUserId.system,
    },
    scope
  )

  const currentDate = new Date()

  const csvContent = fs.readFileSync(`${__dirname}/payments.csv`, 'utf8')

  const records: any[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  for (const record of records) {
    const peerName = record.peerName.trim()
    const description = record.description.trim()
    const date = subDays(currentDate, record.daysAgo)
    const categoryName = record.category.trim()
    const pending = isTrue(record.pending)
    const verified = isTrue(record.verified)

    let categoryId = await findCategory(account.id, categoryName, scope.db)

    if (categoryName && !categoryId) {
      categoryId = await createCategory(account.id, categoryName, scope.db)
    }

    await scope.db.command(sql`
      insert into
        ${payment} (
          ${payment.accountId},
          ${payment.categoryId},
          ${payment.peerId},
          ${payment.peerName},
          ${payment.postedOn},
          ${payment.amount},
          ${payment.description},
          ${payment.data},
          ${payment.pending},
          ${payment.verified}
        )
      values
        ${sql`(
          ${account.id},
          ${categoryId || null},
          ${null},
          ${peerName},
          ${date},
          ${record.sum},
          ${description || null},
          ${{}},
          ${pending},
          ${verified}
        )`};
    `)
  }

  return 1
}
