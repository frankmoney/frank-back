import Onboarding from 'store/types/Onboarding'
import OnboardingScope from '../OnboardingScope'

export type StatusHandlerArg = {
  onboarding: Onboarding
  member: any
  memberGuid: string
  userGuid: string
  scope: OnboardingScope
}

export type StatusHandler = (arg: StatusHandlerArg) => Promise<Onboarding>
