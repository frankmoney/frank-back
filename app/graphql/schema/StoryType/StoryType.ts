import storyPayments from './storyPayments'
import storyCountPayments from './storyCountPayments'
import storyPaymentsDateRange from './storyPaymentsDateRange'
import IntValue from 'app/graphql/schema/IntValue'
import { ID, Type, DateTime } from 'gql'
import PaymentType from '../PaymentType'

const StoryType = Type('Story', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    title: field.ofString(),

    body: field.ofJson(),

    coverImage: field.ofJson().nullable(),

    isPublished: field.ofBool(),

    updatedAt: field.ofDateTime(),

    payments: field
      .listOf(PaymentType)
      .resolve(storyPayments),

    countPayments: field
      .ofType(IntValue)
      .resolve(storyCountPayments),

    paymentsDateRange: field
      .listOf(DateTime)
      .resolve(storyPaymentsDateRange)

  })),
)

export default StoryType
