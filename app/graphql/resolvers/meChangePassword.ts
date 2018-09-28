import { throwForbidden } from 'app/errors/ForbiddenError'
import createPrivateResolver from 'utils/createPrivateResolver'

const meChangePassword = createPrivateResolver(
  'Me:changePassword',
  async ({ user, args, prisma: { query, mutation } }) => {
    if (user && user.id) {
      return await mutation.updateUser(
        {
          where: { id: user.id },
          data: {
            passwordHash: args.password, // TODO: hashing
          },
        },
        `{ id, email, firstName, lastName }`
      )
    } else {
      return throwForbidden()
    }
  }
)

export default meChangePassword
