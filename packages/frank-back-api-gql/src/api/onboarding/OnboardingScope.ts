import { MxClient } from 'mx'
import DalScope from 'api/dal/DefaultActionScope'

export default interface OnboardingScope extends DalScope {
  mx: MxClient
}
