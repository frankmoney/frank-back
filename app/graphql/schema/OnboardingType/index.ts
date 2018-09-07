import Atrium from "mx-atrium"
import OnboardingType from './OnboardingType'

export default OnboardingType

export const CREDENTIALS_STEP = 'credentials'
export const ACCOUNTS_STEP = 'accounts'
export const COMPLETED_STEP = 'completed'

export const AWAITING_INPUT_STATUS = 'awaiting_input'
export const CHECKING_STATUS = 'checking'
export const SUCCESS_STATUS = 'success'

export const CONNECTED_MXSTATUS = 'CONNECTED'

export const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

export { default as findExistedOnboarding } from './findExistedOnboarding'
export { default as syncOnboardingState } from './syncOnboardingState'

export const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)
