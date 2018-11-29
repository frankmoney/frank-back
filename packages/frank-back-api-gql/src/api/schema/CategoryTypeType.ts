import { Enum } from 'gql'
import { CategoryType } from 'store/enums'

const CategoryTypeType = Enum('CategoryType', type =>
  type.values([
    CategoryType[CategoryType.revenue],
    CategoryType[CategoryType.spending],
  ])
)

export default CategoryTypeType
