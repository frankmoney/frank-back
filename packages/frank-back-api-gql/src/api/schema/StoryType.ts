import { Type } from 'gql'
import { AccountAccessRole } from 'store/enums'
import Story from 'store/types/Story'
import getAccount from 'api/dal/Account/getAccount'
import countPaymentsByStoryId from 'api/dal/Payment/countPaymentsByStoryId'
import listPaymentsByStoryId from 'api/dal/Payment/listPaymentsByStoryId'
import getStoryDraftByStoryId from 'api/dal/StoryDraft/getStoryDraftByStoryId'
import getStoryPaymentDateRangeByStoryId from 'api/dal/StoryPayment/getStoryPaymentDateRangeByStoryId'
import mapPayment from 'api/mappers/mapPayment'
import mapStoryDraft from 'api/mappers/mapStoryDraft'
import createResolver from 'api/resolvers/utils/createResolver'
import Date from 'api/types/Date'
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
    draft: field
      .ofType(StoryDraftType)
      .nullable()
      .resolve(
        createResolver<null | StoryDraftGql>(
          'Story:draft',
          async ({ parent, scope }) => {
            const story: Story = parent.$source

            const account = await getAccount(
              {
                userId: scope.user && scope.user.id,
                where: { id: { eq: story.accountId } },
              },
              scope
            )

            switch (account.accessRole) {
              case AccountAccessRole.manager:
              case AccountAccessRole.administrator:
                const draft = await getStoryDraftByStoryId(
                  { storyId: story.id },
                  scope
                )

                return mapStoryDraft(draft!)

              default:
                return null
            }
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
        createResolver<PaymentGql[]>(
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
      createResolver<number>(
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
      .listOfDate()
      .nullable()
      .resolve(
        createResolver<null | Date[]>(
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
