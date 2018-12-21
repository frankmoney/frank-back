import { Input } from 'gql'

const CategoryUpdateUpdateInput = Input('CategoryUpdateUpdate', type =>
  type.fields(field => ({
    name: field.ofString().nullable(),
    color: field.ofString().nullable(),
  }))
)

export default CategoryUpdateUpdateInput
