import AccountWhere from '../../Account/helpers/AccountWhere'

export default interface TeamAccountsWhere {
  empty?: boolean
  any?: AccountWhere
  none?: AccountWhere
  or?: TeamAccountsWhere | TeamAccountsWhere[]
  and?: TeamAccountsWhere | TeamAccountsWhere[]
}
