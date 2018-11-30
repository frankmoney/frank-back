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
}

export default createMutation<Args, Account>(
  'createAccount',
  async (args, { db }) => {
    if (
      R.isNil(args.teamId) ||
      R.isNil(args.name) ||
      R.isNil(args.currencyCode)
    ) {
      throwArgumentError()
    }

    const columns = [account.teamId, account.name, account.currencyCode]

    const values = [args.teamId, args.name, args.currencyCode]

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
