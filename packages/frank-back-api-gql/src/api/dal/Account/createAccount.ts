import { join, sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import Account from 'store/types/Account'
import { account } from 'store/names'
import { throwArgumentError } from 'api/errors/ArgumentError'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import createMutation from '../createMutation'
import R from 'ramda'

type Args = {
  teamId: Id,
  name: string,
  data: Json,
}

export default createMutation<Args, Account>(
  'createAccount',
  async (args, { db }) => {

    if (R.isNil(args.teamId)
      || R.isNil(args.name)
      || R.isNil(args.data)) {

      throwArgumentError()
    }

    const columns = [
      account.teamId,
      account.name,
      account.data,
    ]

    const values = [
      args.teamId,
      args.name,
      JSON.stringify(args.data),
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
          ${account.data}
      `,
      mapAccount,
    )
  },
)
