import { Input } from 'gql'
import CategoryTypeType from './CategoryTypeType'

const CategoryUpdateInput = Input('CategoryUpdate', type =>
  type.fields(field => ({
    name: field.ofString(),
    color: field.ofString(),
    type: field.ofType(CategoryTypeType),
  }))
)

export default CategoryUpdateInput
