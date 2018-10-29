import { Type } from 'gql'
import Story from 'store/types/Story'
import countPaymentsByStoryId from 'api/dal/Payment/countPaymentsByStoryId'
import listPaymentsByStoryId from 'api/dal/Payment/listPaymentsByStoryId'
import getStoryDraftByStoryId from 'api/dal/StoryDraft/getStoryDraftByStoryId'
import getStoryPaymentDateRangeByStoryId from 'api/dal/StoryPayment/getStoryPaymentDateRangeByStoryId'
import mapPayment from 'api/mappers/mapPayment'
import mapStoryDraft from 'api/mappers/mapStoryDraft'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import DateTime from 'api/types/DateTime'
import PaymentGql from 'api/types/Payment'
import StoryDraftGql from 'api/types/StoryDraft'
import PaymentType from './PaymentType'
import PaymentsOrderType from './PaymentsOrderType'
import StoryDraftType from './StoryDraftType'

const StoryType = Type('Story', type =>
  type.fields(field => ({
    pid: field.ofId(),
    createdAt: field.ofDateTime(),
    updatedAt: field.ofDateTime().nullable(),
    publishedAt: field.ofDateTime().nullable(),
    title: field.ofString().nullable(),
    cover: field.ofJson().nullable(),
    body: field.ofJson().nullable(),
    draft: field.ofType(StoryDraftType).resolve(
      createPrivateResolver<StoryDraftGql>(
        'Story:draft',
        async ({ parent, scope }) => {
          const story: Story = parent.$source

          const draft = await getStoryDraftByStoryId(
            { storyId: story.id },
            scope
          )

          return mapStoryDraft(draft!)
        }
      )
    ),
    payments: field
      .listOf(PaymentType)
      .args(arg => ({
        sortBy: arg.ofType(PaymentsOrderType),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver<PaymentGql[]>(
          'Story:payments',
          async ({ parent, args, scope }) => {
            const story: Story = parent.$source

            const payments = await listPaymentsByStoryId(
              {
                storyId: story.id,
                orderBy: args.sortBy,
                take: args.take,
                skip: args.skip,
              },
              scope
            )

            return mapPayment(payments)
          }
        )
      ),
    countPayments: field.ofInt().resolve(
      createPrivateResolver<number>(
        'Story:countPayments',
        async ({ parent, scope }) => {
          const story: Story = parent.$source

          const count = await countPaymentsByStoryId(
            { storyId: story.id },
            scope
          )

          return count
        }
      )
    ),
    paymentsDateRange: field
      .listOfDateTime()
      .nullable()
      .resolve(
        createPrivateResolver<null | DateTime[]>(
          'Story:paymentsDateRange',
          async ({ parent, scope }) => {
            const story: Story = parent.$source

            const range = await getStoryPaymentDateRangeByStoryId(
              { storyId: story.id },
              scope
            )

            return range
          }
        )
      ),
  }))
)

export default StoryType
