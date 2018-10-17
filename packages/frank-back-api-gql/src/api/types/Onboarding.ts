import Id from './Id'
import Json from './Json'

type Onboarding = {
  pid: Id
  step: string
  institution: Json
  credentials: Json
}

export default Onboarding
