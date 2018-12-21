import { Type } from 'gql'
import StoryDraft from 'store/types/StoryDraft'
import countPaymentsByStoryDraftId from 'api/dal/Payment/countPaymentsByStoryDraftId'
import listPaymentsByStoryDraftId from 'api/dal/Payment/listPaymentsByStoryDraftId'
import getStory from 'api/dal/Story/getStory'
import getStoryDraftPaymentDateRangeByStoryId from 'api/dal/StoryDraftPayment/getStoryDraftPaymentDateRangeByStoryId'
import mapPayment from 'api/mappers/mapPayment'
import mapStory from 'api/mappers/mapStory'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import Date from 'api/types/Date'
import PaymentGql from 'api/types/Payment'
import PaymentType from './PaymentType'
import PaymentsOrderType from './PaymentsOrderType'
import StoryType from './StoryType'

const StoryDraftType = Type('StoryDraft', type =>
  type.fields(field => ({
    pid: field.ofId(),
    createdAt: field.ofDateTime(),
    updatedAt: field.ofDateTime().nullable(),
    publishedAt: field.ofDateTime().nullable(),
    title: field.ofString().nullable(),
    cover: field.ofJson().nullable(),
    body: field.ofJson().nullable(),
    published: field.ofBool(),
    story: field.ofType(StoryType).resolve(
      createPrivateResolver(
        'StoryDraft:story',
        async ({ parent, args, scope }) => {
          const draft: StoryDraft = parent.$source

          const story = await getStory(
            { where: { id: { eq: draft.storyId } } },
            scope
          )

          return mapStory(story)
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
          'StoryDraft:payments',
          async ({ parent, args, scope }) => {
            const draft: StoryDraft = parent.$source

            const payments = await listPaymentsByStoryDraftId(
              {
                draftId: draft.id,
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
        'StoryDraft:countPayments',
        async ({ parent, scope }) => {
          const draft: StoryDraft = parent.$source

          const count = await countPaymentsByStoryDraftId(
            { draftId: draft.id },
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
        createPrivateResolver<null | Date[]>(
          'StoryDraft:paymentsDateRange',
          async ({ parent, scope }) => {
            const draft: StoryDraft = parent.$source

            const range = await getStoryDraftPaymentDateRangeByStoryId(
              { draftId: draft.id },
              scope
            )

            return range
          }
        )
      ),
  }))
)

export default StoryDraftType
