import SqlFragment from 'sql/ast/SqlFragment'
import R from 'ramda'
import { sql, join } from 'sql'
import Scope from 'api/Scope'
import parse from 'csv-parse/lib/sync'
import fs from 'fs'
import { SystemUserId } from 'store/enums'
import { payment } from 'store/names'
import createAccount from 'api/dal/Account/createAccount'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import { subDays } from 'date-fns'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createSource from 'api/dal/Source/createSource'
import env from 'env'
import { createCategory, findCategory, findPeer, createPeer, isTrue } from './helpers'

export default async (scope: Scope) => {
  const team = await getTeamByUserId({ userId: scope.user!.id }, scope)

  const settings = JSON.parse(env.DEMO_ACCOUNT_SETTINGS)

  const account = await createAccount(
    {
      teamId: team.id,
      creatorId: SystemUserId.system,
      name: settings.name,
      description: settings.description,
      currencyCode: settings.currencyCode,
      demo: true
    },
    scope,
  )

  const source = await createSource(
    {
      accountId: account.id,
      name: settings.sourceName, // original name
      data: {
        bankName: settings.bankName,
        bankLogo: settings.bankLogo,
        bankLink: settings.bankLink,
        currencyCode: settings.currencyCode,
        balance: settings.balance,
        lastUpdateDate: new Date().toISOString(),
      },
      creatorId: scope.user!.id,
    },
    scope
  )

  const currentDate = new Date()

  const csvContent = fs.readFileSync(`${__dirname}/payments.csv`, 'utf8')

  const records: any[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  const values: SqlFragment[] = []

  for (const record of records) {
    const peerName = record.peerName.trim()
    const description = record.description.trim()
    const daysAgo = parseInt(record.daysAgo, 10) || throwArgumentError()
    const date = subDays(currentDate, daysAgo)
    const amount = parseFloat(record.sum) || throwArgumentError()
    const categoryName = record.category.trim()
    const pending = isTrue(record.pending)
    const verified = isTrue(record.verified)

    if (pending && verified) {
      throwArgumentError()
    }

    let categoryId = verified ? await findCategory(account.id, categoryName, scope.db) : null

    let peerId = verified ? await findPeer(account.id, peerName, scope.db) : null

    if (verified) {

      if (!categoryId && categoryName) {
        categoryId = await createCategory(account.id, categoryName, scope.db)
      }

      if (!peerId && peerName) {
        peerId = await createPeer(account.id, peerName, scope.db)
      }
    }

    values.push(
      sql`(
      ${account.id},
      ${source.id},
      ${categoryId || null},
      ${peerId || null},
      ${peerName},
      ${date},
      ${amount},
      ${description || null},
      ${{}},
      ${pending},
      ${verified}
      )`,
    )
  }

  await scope.db.command(sql`
      insert into
        ${payment} (
          ${payment.accountId},
          ${payment.sourceId},
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
        ${join(values, ', ')};
    `)

  return 1
}
