import ExtendedBase from './ExtendedBase'
import Id from './Id'

type Category = ExtendedBase & {
  name: string
  color: string
  accountId: Id
}

export default Category
