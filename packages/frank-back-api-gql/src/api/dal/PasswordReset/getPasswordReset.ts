import { sql, where } from 'sql'
import mapPasswordReset from 'store/mappers/mapPasswordReset'
import { passwordReset } from 'store/names'
import PasswordReset from 'store/types/PasswordReset'
import createQuery from '../createQuery'
import PasswordResetWhere from './helpers/PasswordResetWhere'
import passwordResetFieldsSql from './helpers/passwordResetFieldsSql'
import passwordResetPredicateSql from './helpers/passwordResetPredicateSql'

export type Args = {
  where: PasswordResetWhere
}

const getPasswordReset = createQuery<Args, PasswordReset>(
  'getPasswordReset',
  (args, { db }) =>
    db.first(
      sql`
        select ${passwordResetFieldsSql('pr')}
        from "${passwordReset}" pr
        ${where(passwordResetPredicateSql('pr', args.where))}
        limit 1
      `,
      mapPasswordReset
    )
)

export default getPasswordReset
