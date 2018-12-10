import { SqlLiteral, join, sql } from 'sql'
import hashPassword from 'utils/hashPassword'
import Database from './Database'
import { CategoryType, CurrencyCode, TeamMemberRole, UserType } from './enums'
import {
  account,
  category,
  payment,
  peer,
  team,
  teamMember,
  user,
} from './names'
import parse from 'csv-parse/lib/sync'
import fs from 'fs'
import Id from './types/Id'

const randomHexColor = () =>
  '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)

const CATS: { [key: string]: Id } = {}

const PEERS: { [key: string]: Id } = {}

const findCategory = async (
  accountId: Id,
  categoryName: string,
  db: Database
) => {
  if (CATS[categoryName]) {
    return CATS[categoryName]
  }

  return await db.scalar(sql`
      select ${category.id} 
      from ${category} 
      where ${category.accountId} = ${accountId}
      and ${category.name} ilike ${categoryName}
    `)
}

const createCategory = async (
  accountId: Id,
  categoryName: string,
  db: Database
) => {
  const categoryId = await db.scalar(sql`
      insert into ${category} (${category.accountId}, ${category.name}, ${
    category.color
  }, ${category.type})
      values ${sql`(${accountId}, ${categoryName}, ${randomHexColor()}, ${
        CategoryType.spending
      })`}
      returning ${category.id}
      `)

  CATS[categoryName] = categoryId

  return categoryId
}

const findPeer = async (accountId: Id, peerName: string, db: Database) => {
  if (PEERS[peerName]) {
    return PEERS[peerName]
  }

  return await db.scalar(sql`
      select ${peer.id} 
      from ${peer} 
      where ${peer.accountId} = ${accountId}
      and ${peer.name} ilike ${peerName}
    `)
}

const createPeer = async (accountId: Id, peerName: string, db: Database) => {
  const peerId = await db.scalar(sql`
      insert into ${peer} (${peer.accountId}, ${peer.name})
      values ${sql`(${accountId}, ${peerName})`}
      returning ${peer.id}
    `)

  PEERS[peerName] = peerId

  return peerId
}

export default async function seed({ db }: { db: Database }) {
  const accountId = 3

  const csvContent = fs.readFileSync('./payments.csv', 'utf8')

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  for (const record of records) {
    const categoryName = record.category.trim()

    let categoryId = await findCategory(accountId, categoryName, db)

    if (!categoryId) {
      categoryId = await createCategory(accountId, categoryName, db)
    }

    const peerName = record.peer.trim()

    let peerId = await findPeer(accountId, peerName, db)

    if (!peerId) {
      peerId = await createPeer(accountId, peerName, db)
    }

    await db.command(sql`
      insert into
        ${payment} (
          ${payment.accountId},
          ${payment.categoryId},
          ${payment.peerId},
          ${payment.postedOn},
          ${payment.amount},
          ${payment.description},
          ${payment.verified}
        )
      values
        ${sql`(
          ${accountId},
          ${categoryId},
          ${peerId},
          ${record.date},
          ${record.sum},
          ${record.title || record.desc},
          true
        )`};
    `)
  }
}
