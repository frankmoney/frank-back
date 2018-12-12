import CategoryWhere from '../../Category/helpers/CategoryWhere'

export default interface AccountCategoriesWhere {
  empty?: boolean
  any?: CategoryWhere
  none?: CategoryWhere
  or?: AccountCategoriesWhere | AccountCategoriesWhere[]
  and?: AccountCategoriesWhere | AccountCategoriesWhere[]
}
