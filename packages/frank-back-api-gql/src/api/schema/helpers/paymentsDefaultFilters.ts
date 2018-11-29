import FieldArgumentBuilder from 'gql/nodes/FieldArgumentBuilder'
import CategoryTypeType from 'api/schema/CategoryTypeType'

const paymentsDefaultFilters = (arg: FieldArgumentBuilder) => ({
  postedOnMin: arg.ofDate().nullable(),
  postedOnMax: arg.ofDate().nullable(),
  amountMin: arg.ofFloat().nullable(),
  amountMax: arg.ofFloat().nullable(),
  verified: arg.ofBool().nullable(),
  pending: arg.ofBool().nullable(),
  search: arg.ofString().nullable(),
  categoryType: arg.ofType(CategoryTypeType).nullable(),
})

export default paymentsDefaultFilters
