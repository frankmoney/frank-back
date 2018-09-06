import { OnboardingWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'onboarding',
  ({ user, prisma: { query } }) => {

    console.log(user)

    return null
  },
)
