import R from 'ramda'
import { join, sql } from 'sql'
import mapSource from 'store/mappers/mapSource'
import { source } from 'store/names'
import Source from 'store/types/Source'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'

type Args = {
  accountId: Id
  name: string
  data: Json
  creatorId: Id
}

export default createMutation<Args, Source>(
  'createSource',
  async (args, { db }) => {
    const columns = [
      source.accountId,
      source.name,
      source.data,
      source.currencyCode,
      source.creatorId,
    ]

    const values = [
      args.accountId,
      args.name,
      JSON.stringify(args.data),
      args.data.currencyCode,
      args.creatorId,
    ]

    return await db.first(
      sql`
        insert into ${source} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${source.id},
          ${source.pid},
          ${source.accountId},
          ${source.name},
          ${source.data},
          ${source.currencyCode}
      `,
      mapSource
    )
  }
)