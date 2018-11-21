// import createTeamResolver from 'api/resolvers/factories/createTeamResolver'
import { Type } from 'gql'

const UserType = Type('User', type =>
  type.fields(field => ({
    pid: field.ofId(),
    email: field.ofString().nullable(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString().nullable(),
    name: field.ofString(),
    avatar: field.ofJson().nullable(),
    color: field.ofInt(),
    // team: field
    //   .ofType(TeamType)
    //   .resolve(
    //     createTeamResolver<User>(
    //       'User:team',
    //       ({ parent: { $source: user } }) => sql`${t_team.id} = ${user.team_id}`
    //     )
    //   ),
  }))
)

export default UserType
