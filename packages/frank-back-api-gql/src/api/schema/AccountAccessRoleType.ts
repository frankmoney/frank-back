import { Enum } from 'gql'
import AccountAccessRole from 'api/types/AccountAccessRole'

const AccountAccessRoleType = Enum('AccountAccessRole', type =>
  type.values([
    AccountAccessRole.nobody,
    AccountAccessRole.visitor,
    AccountAccessRole.observer,
    AccountAccessRole.manager,
    AccountAccessRole.administrator,
  ])
)

export default AccountAccessRoleType
