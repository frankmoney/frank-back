import { readFileSync } from 'fs'
import path from 'path'
import { IResolvers } from 'graphql-tools'
import GraphQLJSON from 'graphql-type-json'
import { mergeDeepWith } from 'ramda'
import { Context } from 'app/Context'
import accountCategories from './accountCategories'
import directory from './directory'
import inbox from './inbox'
import ledger from './ledger'
import team from './team'
import stories from './stories'
import test from './test'

const merge = (...args: any[]) => {
  let left = {}
  for (const right of args) {
    left = mergeDeepWith(
      (l: any, r: any) => {
        throw new Error(`Merge conflict: ${l} =/= ${r}.`)
      },
      left,
      right
    )
  }
  return left
}

export const typeDefs = readFileSync(
  path.join(__dirname, 'generated', 'schema.graphql'),
  'utf8'
)

const root = {
  Query: {
    accountCategories,
  },
  Mutation: {},
}

export const resolvers: IResolvers<any, Context> = {
  ...merge(root, directory, inbox, ledger, team, stories, test),
  JSON: GraphQLJSON,
}
