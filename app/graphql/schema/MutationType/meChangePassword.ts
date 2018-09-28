import meChangePasswordResolver from 'app/graphql/resolvers/meChangePassword'
import createMutations from 'utils/createMutations'
import MeType from '../MeType'

const meChangePassword = createMutations(field => ({
  meChangePassword: field
    .ofType(MeType)
    .args(arg => ({
      password: arg.ofString(),
    }))
    .resolve(meChangePasswordResolver),
}))

export default meChangePassword
