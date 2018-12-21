import { Enum } from 'gql'

const CategoryDeleteResultType = Enum('CategoryDeleteResult', type =>
  type.values(['success', 'hasPayments'])
)

export default CategoryDeleteResultType
