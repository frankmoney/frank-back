import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Onboarding = ExtendedBase & {
  step: string
  institution: Json,
  credentials: Json,
  mfa: Json,
  accounts: Json,
  account: Json,
  categories: Json,
  team: Json,
  mxMemberId: Id
}

export default Onboarding
