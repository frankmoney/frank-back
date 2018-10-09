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
      x.alter
        .table(teamMember)
        .addForeignKey()
        .column(t => t.teamId)
        .to(team)
        .column(t => t.id),
    x =>
      x.alter
        .table(teamMember)
        .addForeignKey()
        .column(t => t.userId)
        .to(user)
        .column(t => t.id),
    x =>
      x.alter
        .table(teamMember)
        .addForeignKey()
        .column(t => t.roleId)
        .to(teamMemberRole)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(teamMember))
}
