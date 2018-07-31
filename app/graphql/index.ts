import { readFileSync } from 'fs'
import path from 'path'
import { IResolvers } from 'graphql-tools'
import { Context } from 'app/Context'
import team from './team'

export const typeDefs = readFileSync(
  path.join(__dirname, 'generated', 'schema.graphql'),
  'utf8'
)

export const resolvers: IResolvers<any, Context> = {
  ...team,
}
