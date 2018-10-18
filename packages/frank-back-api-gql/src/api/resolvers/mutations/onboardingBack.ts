import { throwArgumentError } from 'api/errors/ArgumentError'
import OnboardingType from 'api/schema/OnboardingType'
import {
  ACCOUNT_STEP,
  ACCOUNTS_STEP,
  AWAITING_INPUT_STATUS,
  CATEGORIES_STEP,
  CREDENTIALS_STEP,
  MFA_STEP,
  TEAM_STEP,
} from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import mapOnboarding from 'api/mappers/mapOnboarding'

const onboardingBack = createPrivateResolver(
  'Mutation:onboarding:back',
  async ({ scope }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    if (existingOnboarding.step === CREDENTIALS_STEP) {
      return mapOnboarding(existingOnboarding)
    }

    let newStep = CREDENTIALS_STEP

    switch (existingOnboarding.step) {
      case TEAM_STEP:
        newStep = CATEGORIES_STEP
        break
      case CATEGORIES_STEP:
        newStep = ACCOUNT_STEP
        break
      case ACCOUNT_STEP:
        newStep = ACCOUNTS_STEP
        break
      case ACCOUNTS_STEP:
      case MFA_STEP:
        newStep = CREDENTIALS_STEP
        break
    }

    const data = {
      pid: existingOnboarding.pid,
      step: newStep,
      clearMember: false,
      clearMfa: false,
      credentials: undefined,
    }

    if (newStep === CREDENTIALS_STEP) {

      data.clearMember = true
      data.clearMfa = true

      data.credentials = {
        ...existingOnboarding.credentials,
        status: AWAITING_INPUT_STATUS,
      }
    }

    const updatedOnboarding = await updateOnboardingByPid(data, scope)

    return mapOnboarding(updatedOnboarding)
  },
)

export default createMutations(field => ({
  onboardingBack: field.ofType(OnboardingType).resolve(onboardingBack),
}))
