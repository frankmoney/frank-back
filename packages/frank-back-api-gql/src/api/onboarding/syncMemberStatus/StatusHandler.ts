import DefaultActionScope from 'api/dal/DefaultActionScope'
import Onboarding from 'store/types/Onboarding'

export type StatusHandlerArg = {
  onboarding: Onboarding
  member: any
  memberGuid: string
  userGuid: string
  scope: DefaultActionScope
}

export type StatusHandler = (arg: StatusHandlerArg) => Promise<Onboarding>
