import CategoryType from './CategoryType'
import Id from './Id'

type Category = {
  pid: Id
  name: string
  color: string
  type: CategoryType
}

export default Category
