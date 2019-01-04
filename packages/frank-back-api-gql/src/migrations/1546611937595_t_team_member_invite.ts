import { MigrationContext } from './1546611937595_t_team_member_invite.migration'
import {
  team,
  teamMemberInvite,
  teamMemberRole,
  user,
} from './1546611937595_t_team_member_invite.names'

export const up = async ({ ddl }: MigrationContext) => {
  const idSeqName = `sq:${teamMemberInvite}(${teamMemberInvite.id})`

  await ddl(
    x => x.create.sequence(idSeqName),
    x =>
      x.create
        .table(teamMemberInvite)
        .column(t => t.id, `bigint not null default nextval('${idSeqName}')`)
        .column(t => t.token, 'uuid not null')
        .column(
          t => t.createdAt,
          `timestamp not null default (now() at time zone 'utc')`
        )
        .column(t => t.creatorId, 'bigint not null')
        .column(t => t.updatedAt, 'timestamp')
        .column(t => t.usedAt, 'timestamp')
        .column(t => t.email, 'varchar(256) not null')
        .column(t => t.note, 'text')
        .column(t => t.teamId, 'bigint not null')
        .column(t => t.roleId, 'bigint')
        .column(t => t.userId, 'bigint'),
    x =>
      x.create
        .foreignKey()
        .on(teamMemberInvite)
        .column(t => t.creatorId)
        .referencing(user)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(teamMemberInvite)
        .column(t => t.teamId)
        .referencing(team)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(teamMemberInvite)
        .column(t => t.roleId)
        .referencing(teamMemberRole)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(teamMemberInvite)
        .column(t => t.userId)
        .referencing(user)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(teamMemberInvite))
}
