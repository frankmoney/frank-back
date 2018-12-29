import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Story from 'store/types/Story'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import listPayments from 'api/dal/Payment/listPayments'
import mapPayment from 'api/mappers/mapPayment'
import createResolver from 'api/resolvers/utils/createResolver'
import AggregatedPayments from 'api/types/AggregatedPayments'
import PaymentGql from 'api/types/Payment'
import AggregatedPaymentsType from './AggregatedPaymentsType'
import PaymentType from './PaymentType'
import PaymentsOrderType from './PaymentsOrderType'
import createPaymentWhere from './helpers/createPaymentWhere'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'

const StoryType = Type('Story', type =>
  type.fields(field => ({
    pid: field.ofId(),
    createdAt: field.ofDateTime(),
    updatedAt: field.ofDateTime().nullable(),
    publishedAt: field.ofDateTime().nullable(),
    title: field.ofString().nullable(),
    cover: field.ofJson().nullable(),
    body: field.ofJson().nullable(),
    payments: field
      .listOf(PaymentType)
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PaymentsOrderType),
      }))
      .resolve(
        createResolver<PaymentGql[]>(
          'Story:payments',
          async ({ parent, args, scope }) => {
            const story: Story = parent.$source

            const payments = await listPayments(
              {
                where: createPaymentWhere(args, {
                  stories: {
                    any: {
                      id: { eq: story.id },
                    },
                  },
                }),
                take: args.take,
                skip: args.skip,
                orderBy: args.sortBy,
              },
              scope
            )

            return mapPayment(payments)
          }
        )
      ),
    aggregatePayments: field
      .ofType(AggregatedPaymentsType)
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createResolver(
          'Story:aggregatePayments',
          async ({ parent, args, info, scope }) => {
            const story: Story = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  stories: {
                    any: {
                      id: { eq: story.id },
                    },
                  },
                }),
              },
              scope
            )

            return result
          }
        )
      ),
  }))
)

export default StoryType
