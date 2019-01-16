import { sql } from 'sql'
import Database from 'store/Database'
import Id from 'store/types/Id'
import { CategoryType } from 'store/enums'
import { category, peer } from 'store/names'

const CATS: { [key: string]: Id } = {}

const PEERS: { [key: string]: Id } = {}

const randomHexColor = () =>
  '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)

export const isTrue = (s: string) => {
  return ['1', 'true', 't', '+'].includes(s.trim().toLowerCase())
}

export const findCategory = async (
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

export const createCategory = async (
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

export const findPeer = async (
  accountId: Id,
  peerName: string,
  db: Database
) => {
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

export const createPeer = async (
  accountId: Id,
  peerName: string,
  db: Database
) => {
  const peerId = await db.scalar(sql`
      insert into ${peer} (${peer.accountId}, ${peer.name})
      values ${sql`(${accountId}, ${peerName})`}
      returning ${peer.id}
    `)

  PEERS[peerName] = peerId

  return peerId
}
