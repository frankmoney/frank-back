import { sql } from 'sql'
import { SystemUserId, UserType } from 'store/enums'
import { user } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  email: string
  passwordHash: string
  lastName: null | string
  firstName: string
  color: number
  phone: null | string
}

export type Result = {
  status: 'ok' | 'duplicate'
  userId: Id
}

export default createMutation<Args, Result>(
  'createPersonUserMaybe',
  async (args, { db }) => {
    const existingUserId = await db.scalar<null | Id>(
      sql`
        select "${user.id}"
        from "${user}"
        where "${user.name}" = ${args.email.toLowerCase()} 
      `
    )

    if (existingUserId) {
      return {
        status: 'duplicate',
        userId: existingUserId,
      }
    } else {
      const userId = await db.scalar<Id>(
        sql`
          insert into
            "${user}" (
              "${user.creatorId}",
              "${user.typeId}",
              "${user.name}",
              "${user.email}",
              "${user.passwordHash}",
              "${user.lastName}",
              "${user.firstName}",
              "${user.color}",
              "${user.phone}"
            )
          values
            (
              ${SystemUserId.system},
              ${UserType.person},
              ${args.email.toLowerCase()},
              ${args.email},
              ${args.passwordHash},
              ${args.lastName},
              ${args.firstName},
              ${args.color},
              ${args.phone}
            )
          returning
            "${user.id}"
        `
      )

      return {
        status: 'ok',
        userId,
      }
    }
  }
)
