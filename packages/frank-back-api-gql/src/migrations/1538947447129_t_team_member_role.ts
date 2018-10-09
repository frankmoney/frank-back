import { sql } from 'sql'
import { MigrationContext } from './1538947447129_t_team_member_role.migration'
import { TeamMemberRole } from './1538947447129_t_team_member_role.enums'
import { teamMemberRole } from './1538947447129_t_team_member_role.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x =>
    x.create
      .table(teamMemberRole, {
        columns: {
          id: 'bigint not null',
          pid: false,
          creatorId: false,
          updatedAt: false,
          updaterId: false,
        },
        indexes: false,
        sequences: false,
      })
      .column(t => t.name, 'varchar(128)')
  )

  await db.command(sql`
    insert into
      ${teamMemberRole} ( ${teamMemberRole.id}, ${teamMemberRole.name} )
    values
      ( ${TeamMemberRole.administrator}, ${
    TeamMemberRole[TeamMemberRole.administrator]
  } ),
      ( ${TeamMemberRole.manager}, ${TeamMemberRole[TeamMemberRole.manager]} ),
      ( ${TeamMemberRole.observer}, ${
    TeamMemberRole[TeamMemberRole.observer]
  } );
  `)
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(teamMemberRole))
}
