import { join, sql } from '../../sql'
import { payment } from '../names'
import Database from '../Database'
import { format, subDays } from 'date-fns'

const DATE_FORMAT = 'YYYY-MM-DD'

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const accountId = 1
const maxCategoryId = 13
const maxPeerId = 19
const amounts = [-12000, -10000, -6000, -4200, -3250, -2500, -1020, -500, -99.9, -54, -5.5, -1,
  10, 100, 600, 4000, 10000, 15000]

export default async (db: Database, updateIdSequence: any) => {

  const payments = []

  for (let i = 1; i <= 300; i++) {

    const date = subDays(new Date(), Math.floor(i / 2) + getRandomInt(0, 3))

    payments.push({
      accountId,
      paymentId: i,
      categoryId: getRandomInt(1, maxCategoryId + 1),
      peerId: getRandomInt(1, maxPeerId + 1),
      postedOn: format(date, DATE_FORMAT),
      amount: amounts[getRandomInt(0, amounts.length)],
    })

  }

  const data = payments.map(
    x => sql`(
      ${x.paymentId},
      ${x.accountId},
      ${x.categoryId}::bigint,
      ${x.peerId}::bigint,
      ${x.postedOn},
      ${x.amount}
    )`,
  )

  await db.command(sql`
      insert into
        ${payment} (
          ${payment.id},
          ${payment.accountId},
          ${payment.categoryId},
          ${payment.peerId},
          ${payment.postedOn},
          ${payment.amount}
        )
      values
        ${join(data, ', ')}
      on conflict ( ${payment.id} )
      do nothing;
    `)

  await updateIdSequence(payment)
}
