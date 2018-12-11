import FieldArgumentBuilder from 'gql/nodes/FieldArgumentBuilder'
import CategoryTypeType from '../CategoryTypeType'

const categoriesDefaultFilters = (arg: FieldArgumentBuilder) => ({
  type: arg.ofType(CategoryTypeType).nullable(),
  search: arg.ofString().nullable(),
})

export default categoriesDefaultFilters
