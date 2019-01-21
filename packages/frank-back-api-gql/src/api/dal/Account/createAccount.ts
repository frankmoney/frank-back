import R from 'ramda'
import { join, sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'

type Args = {
  teamId: Id
  name: string
  description?: string
  demo?: boolean
  currencyCode: string
  creatorId: Id
}

export default createMutation<Args, Account>(
  'createAccount',
  async (args, { db }) => {
    const columns = [
      account.teamId,
      account.name,
      account.description,
      account.currencyCode,
      account.creatorId,
      account.public,
      account.demo,
    ]

    const values = [
      args.teamId,
      args.name,
      args.description || null,
      args.currencyCode,
      args.creatorId,
      false,
      args.demo || false
    ]

    return await db.first(
      sql`
        insert into ${account} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${account.id},
          ${account.pid},
          ${account.teamId},
          ${account.name},
          ${account.data},
          ${account.currencyCode}
      `,
      mapAccount
    )
  }
)
