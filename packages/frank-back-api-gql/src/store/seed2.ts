import { sql } from 'sql'
import Database from './Database'
import { CategoryType } from './enums'
import {
  category,
  payment,
  peer,
} from './names'
import parse from 'csv-parse/lib/sync'
import fs from 'fs'
import Id from './types/Id'

const randomHexColor = () =>
  '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

const DESCRIPTIONS = [
  'In 2001, Elon Musk conceptualized Mars Oasis, a project to land a miniature experimental greenhouse and grow plants on Mars',
  'On the flight home, Musk realized that he could start a company that could build the affordable rockets he needed',
  'According to early Tesla and SpaceX investor Steve Jurvetson,[29] Musk calculated that the raw materials for building a rocket',
  'In early 2002, Musk was seeking staff for his new space company, soon to be named SpaceX',
  'Musk approached rocket engineer Tom Mueller (now SpaceX\'s CTO of Propulsion) and Mueller agreed to work for Musk, and thus SpaceX was born',
  'As of March 2018, SpaceX had over 100 launches on its manifest representing about $12 billion in contract revenue',
  'The contracts included both commercial and government (NASA/DOD) customers',
  'Musk has stated that one of his goals is to decrease the cost and improve the reliability of access to space, ultimately by a factor of ten',
  'CEO Elon Musk said: "I believe $500 per pound ($1,100/kg) or less is very achievable',
  'A major goal of SpaceX has been to develop a rapidly reusable launch system',
  'SpaceX currently manufactures three broad classes of rocket engine in-house',
  'Since the founding of SpaceX in 2002, the company has developed three families of rocket engines',
  'Merlin is a family of rocket engines developed by SpaceX for use on its Falcon rocket family',
  'SpaceX\'s Falcon 9 rocket carrying the Dragon spacecraft, lifts off during the COTS Demo Flight 1 in December 2010'
]

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
  const accountId = 15

  const csvContent = fs.readFileSync('./payments.csv', 'utf8')

  const records: any[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  let currentPercent = 0

  for (let i=0; i<records.length; i++ ) {

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
          ${DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)]},
          true,
          ${{originalDescription}}
        )`};
    `)

    const newPercent = Math.floor(100*i/records.length)

    if (newPercent !== currentPercent) {

      currentPercent = newPercent

      console.log(currentPercent)
    }
  }
}
