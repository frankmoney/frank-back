import { Type } from 'gql'
import Onboarding from '../../store/types/Onboarding'
import createPrivateResolver from '../resolvers/utils/createPrivateResolver'

const OnboardingType = Type('Onboarding', type =>
  type.fields(field => ({
    step: field.ofString(),
    institution: field.ofJson(),
    credentials: field.ofJson(),
    accounts: field.ofJson().nullable(),
    account: field.ofJson().nullable(),
    spendingCategories: field
      .ofJson()
      .nullable()
      .resolve(
        createPrivateResolver('Onboarding:spendingCategories', ({ parent }) => {
          return parent.categories && parent.categories.spending
        })
      ),
    revenueCategories: field
      .ofJson()
      .nullable()
      .resolve(
        createPrivateResolver('Onboarding:revenueCategories', ({ parent }) => {
          return parent.categories && parent.categories.revenue
        })
      ),
    team: field.ofJson().nullable(),
    mfa: field.ofJson().nullable(),
  }))
)

export default OnboardingType
