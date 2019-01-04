import { Type, Json, Enum } from 'gql'

export const NEED_CREDENTIALS_STATUS = 'needCredentials'
export const NEED_MFA_STATUS = 'needMFA'
export const CHECKING_STATUS = 'checking'
export const LOCKED_STATUS = 'locked'
export const NORMAL_STATUS = 'normal'
export const FAILED_STATUS = 'failed'

const SourceStateStatusEnum = Enum('SourceStateStatus', type =>
  type.values([
    NEED_CREDENTIALS_STATUS,
    NEED_MFA_STATUS,
    CHECKING_STATUS,
    NORMAL_STATUS,
    LOCKED_STATUS,
    FAILED_STATUS,
  ])
)

const SourceStateType = Type('SourceState', type =>
  type.fields(field => ({
    status: field.ofType(SourceStateStatusEnum),
    credentials: field.listOf(Json).nullable(),
    challenges: field.listOf(Json).nullable(),
  }))
)

export default SourceStateType
