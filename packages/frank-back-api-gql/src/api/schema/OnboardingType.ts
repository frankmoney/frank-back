import { Type } from 'gql'

const OnboardingType = Type('Onboarding', type =>
  type.fields(field => ({
    step: field.ofString(),
    institution: field.ofJson(),
    credentials: field.ofJson(),
    accounts: field.ofJson().nullable(),
    account: field.ofJson().nullable(),
    categories: field.ofJson().nullable(),
    team: field.ofJson().nullable(),
    mfa: field.ofJson().nullable(),
  }))
)

export default OnboardingType
