import { Enum } from 'gql'
import CategoryType from 'api/types/CategoryType'

const CategoryTypeType = Enum('CategoryType', type =>
  type.values([
    CategoryType.revenue,
    CategoryType.spending,
  ])
)

export default CategoryTypeType
