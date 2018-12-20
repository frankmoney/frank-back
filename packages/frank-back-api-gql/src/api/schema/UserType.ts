import { Type } from 'gql'
import createResolver from 'api/resolvers/utils/createResolver'
import { UserType as UserTypeEnum } from 'store/enums'

const UserType = Type('User', type =>
  type.fields(field => ({
    pid: field.ofId(),
    email: field.ofString().nullable(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString().nullable(),
    name: field.ofString(),
    avatar: field.ofJson().nullable(),
    color: field.ofInt(),
    isSystem: field
      .ofBool()
      .nullable()
      .resolve(
        createResolver(
          'Source:isSystem',
          async ({ parent }) => parent.$source.typeId === UserTypeEnum.system
        )
      ),
  }))
)

export default UserType
