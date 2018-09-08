import {
  PaymentUpdateInput,
  PaymentWhereUniqueInput,
} from 'app/graphql/generated/prisma'
import { ID, Json, String, Type, Input } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import PaymentType from 'app/graphql/schema/PaymentType'

const UpdatePaymentsUpdateInput = Input('UpdatePaymentsUpdateInput', type =>
  type.fields(field => ({
    paymentId: field.ofType(ID),
    categoryId: field.ofType(ID).nullable(),
  }))
)

const paymentUpdate = createPrivateResolver(
  'Mutation:payment:update',
  async ({
    assert,
    args: { accountId, updates },
    prisma: { query, mutation },
  }) => {
    await assert.accountAccess(accountId)

    const paymentIds = updates.map((x: { paymentId: string }) => x.paymentId)

    const payments = await query.payments(
      {
        where: {
          id_in: paymentIds,
          account: { id: accountId },
        },
      },
      `{
        id
        category {
          id
        }
      }`
    )

    for (const { id, category } of payments) {
      const { categoryId } = updates.filter(
        (x: { paymentId: string }) => x.paymentId === id
      )[0]
      if (((category && category.id) || null) !== categoryId) {
        const where: PaymentWhereUniqueInput = { id }

        const data: PaymentUpdateInput = {
          category: {
            connect: {
              id: categoryId,
            },
          },
        }

        await mutation.updatePayment({ where, data })
      }
    }

    const result = await query.payments({
      where: { id_in: payments.map(x => x.id) },
    })

    return result
  }
)

export default (field: any) =>
  field
    .listOf(PaymentType)
    .args((arg: any) => ({
      accountId: arg.ofType(ID),
      updates: arg.listOf(UpdatePaymentsUpdateInput),
    }))
    .resolve(paymentUpdate)
