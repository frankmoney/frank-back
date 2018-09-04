import storyCountPayments from './storyCountPayments'
import storyPaymentsDateRange from './storyPaymentsDateRange'
import IntValue from 'app/graphql/schema/IntValue'
import { ID, Type, DateTime } from 'gql'
import AccountType from '../AccountType'

const StoryType = Type('Story', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    title: field.ofString(),

    body: field.ofJson().nullable(),

    coverImage: field.ofJson().nullable(),

    isPublished: field.ofBool(),

    updatedAt: field.ofDateTime(),

    countPayments: field
      .ofType(IntValue)
      .resolve(storyCountPayments),

    paymentsDateRange: field
      .listOf(DateTime)
      .resolve(storyPaymentsDateRange)

  })),
)

export default StoryType
