import IntValue from 'app/graphql/schema/IntValue'
import { Type } from 'gql'
import PaymentType from '../PaymentType'

const OnboardingType = Type('Onboarding', type =>
  type.fields(field => ({
    step: field.ofString(),
    institution: field.ofJson(),
    credentials: field.ofJson(),
    accounts: field.ofJson(),
    account: field.ofJson(),
  })),
)

export default OnboardingType
