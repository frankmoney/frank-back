import { ID, String, Type, Json } from 'gql'
import AccountType from '../AccountType'
import MeType from '../MeType'
import OnboardingType from '../OnboardingType'
import StoryType from '../StoryType'
import TeamType from '../TeamType'
import account from './account'
import accounts from './accounts'
import me from './me'
import story from './story'
import stories from './stories'
import team from './team'
import onboardingInstitutions from './onboardingInstitutions'
import onboarding from './onboarding'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    me: field
      .ofType(MeType)
      .nullable()
      .resolve(me),

    team: field.ofType(TeamType).resolve(team),

    account: field
      .ofType(AccountType)
      .args(arg => ({
        id: arg.ofType(ID),
      }))
      .resolve(account),

    accounts: field
      .listOf(AccountType)
      .args(arg => ({
        search: arg.ofType(String).nullable(),
      }))
      .resolve(accounts),

    story: field
      .ofType(StoryType)
      .args(arg => ({
        id: arg.ofType(ID),
      }))
      .resolve(story),

    stories: field
      .listOf(StoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        isPublished: arg.ofBool().nullable(),
      }))
      .resolve(stories),

    onboardingInstitutions: field
      .listOf(Json)
      .args(arg => ({
        name: arg.ofString().nullable(),
      }))
      .resolve(onboardingInstitutions),

    onboarding: field
      .ofType(OnboardingType).nullable()
      .resolve(onboarding),
  })),
)

export default QueryType
