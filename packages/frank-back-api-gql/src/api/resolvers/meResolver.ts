import getUserById from 'api/dal/User/getUserById'
import mapUser from 'api/mappers/mapUser'
import User from 'api/types/User'
import createResolver from './utils/createResolver'

const meResolver = createResolver<null | User>('me', async ({ scope }) => {
  if (scope.user) {
    const user = await getUserById({ id: scope.user.id }, scope)
    return mapUser(user)
  }
  return null
})

export default meResolver
