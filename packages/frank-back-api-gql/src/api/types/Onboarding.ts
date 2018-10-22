import Id from './Id'
import Json from './Json'

type Onboarding = {
  pid: Id
  step: string
  institution: Json
  credentials: Json
  mfa: Json
  accounts: Json
  account: Json
  categories: Json
  team: Json
}

export default Onboarding
