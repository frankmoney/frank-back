import { ID, Input } from 'gql'

const UpdatePaymentsUpdateInput = Input('UpdatePaymentsUpdateInput', type =>
  type.fields(field => ({
    paymentId: field.ofType(ID),
    categoryId: field.ofType(ID).nullable(),
  }))
)

export default UpdatePaymentsUpdateInput
