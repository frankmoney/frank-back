import { sql } from 'sql'
import Database from './Database'
import { CategoryType } from './enums'
import { category, payment, peer } from './names'
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
  const accountId = 16

  const csvContent = fs.readFileSync('./payments.csv', 'utf8')

  const records: any[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  let currentPercent = 0

  for (let i = 0; i < records.length; i++) {
    const record = records[i]

    const categoryName = record.category.trim()

    let categoryId = await findCategory(accountId, categoryName, db)

    if (!categoryId) {
      categoryId = await createCategory(accountId, categoryName, db)
    }

    const peerName = record.peer.trim()

    let originalDescription = record.memo.trim()

    if (!originalDescription) {
      originalDescription = `fake bank description; ${peerName}; RndHex: ${randomHexColor()}`
    }

    const description = record.desc.trim() || record.title.trim()

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
          ${payment.peerName},
          ${payment.postedOn},
          ${payment.amount},
          ${payment.description},
          ${payment.verified},
          ${payment.data}
        )
      values
        ${sql`(
          ${accountId},
          ${categoryId},
          ${peerId},
          ${peerName},
          ${record.date},
          ${record.sum},
          ${description || null},
          false,
          ${{ originalDescription }}
        )`};
    `)

    const newPercent = Math.floor((100 * i) / records.length)

    if (newPercent !== currentPercent) {
      currentPercent = newPercent

      console.log(currentPercent)
    }
  }
}
