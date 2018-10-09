import { sql } from 'sql'
import { MigrationContext } from './1539006234802_default_team_members.migration'
import { TeamMemberRole } from './1539006234802_default_team_members.enums'
import { teamMember } from './1539006234802_default_team_members.names'

export const up = async ({ db }: MigrationContext) => {
  await db.command(sql`
    insert into
      ${teamMember} ( ${teamMember.teamId}, ${teamMember.userId}, ${
    teamMember.roleId
  } )
    values
      ( 1, 1, ${TeamMemberRole.administrator} ),
      ( 1, 2, ${TeamMemberRole.manager} ),
      ( 1, 3, ${TeamMemberRole.administrator} ),
      ( 1, 4, ${TeamMemberRole.administrator} ),
      ( 1, 5, ${TeamMemberRole.administrator} ),
      ( 1, 6, ${TeamMemberRole.observer} );
  `)
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(sql`
    delete from ${teamMember}
    where ${teamMember.teamId} = 1
    and ${teamMember.userId} in (1, 2, 3, 4, 5, 6);
  `)
}
