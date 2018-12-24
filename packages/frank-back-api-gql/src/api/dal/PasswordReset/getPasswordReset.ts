import { sql } from 'sql'
import mapPasswordReset from 'store/mappers/mapPasswordReset'
import { passwordReset } from 'store/names'
import PasswordReset from 'store/types/PasswordReset'
import createQuery from '../createQuery'

export type Args = {
  token: string
}

const getPasswordReset = createQuery<Args, PasswordReset>(
  'getPasswordReset',
  (args, { db }) =>
    db.first(
      sql`
      select *
      from "${passwordReset}"
      where "${passwordReset.token}" = ${args.token}
      limit 1
    `,
      mapPasswordReset
    )
)

export default getPasswordReset
