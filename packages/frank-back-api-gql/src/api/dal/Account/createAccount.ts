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
  currencyCode: string
  creatorId: Id
}

export default createMutation<Args, Account>(
  'createAccount',
  async (args, { db }) => {
    const columns = [
      account.teamId,
      account.name,
      account.currencyCode,
      account.creatorId,
    ]

    const values = [args.teamId, args.name, args.currencyCode, args.creatorId]

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
