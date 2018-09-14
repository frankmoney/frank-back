import storyPayments from './storyPayments'
import storyCountPayments from './storyCountPayments'
import storyPaymentsDateRange from './storyPaymentsDateRange'
import IntValue from 'app/graphql/schema/IntValue'
import { ID, Type, DateTime } from 'gql'
import PaymentType from '../PaymentType'

const StoryDataType = Type('StoryData', type =>
  type.fields(field => ({

    title: field.ofString(),
    body: field.ofJson(),
    coverImage: field.ofJson().nullable(),
    payments: field.listOf(PaymentType).resolve(storyPayments),
    countPayments: field.ofType(IntValue).resolve(storyCountPayments),
    paymentsDateRange: field.listOf(DateTime).resolve(storyPaymentsDateRange),
  })),
)

const StoryType = Type('Story', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    isPublished: field.ofBool(),

    updatedAt: field.ofDateTime(),

    draftData: field.ofType(StoryDataType),

    publicData: field.ofType(StoryDataType).nullable(),
  })),
)

export default StoryType
