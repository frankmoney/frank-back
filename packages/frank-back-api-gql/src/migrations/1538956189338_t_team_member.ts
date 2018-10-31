import { MigrationContext } from './1538956189338_t_team_member.migration'
import {
  team,
  teamMember,
  teamMemberRole,
  user,
} from './1538956189338_t_team_member.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(teamMember, true)
        .column(t => t.teamId, 'bigint not null')
        .column(t => t.userId, 'bigint not null')
        .column(t => t.roleId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(teamMember)
        .column(t => t.teamId)
        .referencing(team)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(teamMember)
        .column(t => t.userId)
        .referencing(user)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(teamMember)
        .column(t => t.roleId)
        .referencing(teamMemberRole)
        .column(t => t.id),
    x =>
      x.create
        .constraint()
        .on(teamMember)
        .column(t => t.teamId)
        .column(t => t.userId)
        .unique()
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(teamMember))
}
