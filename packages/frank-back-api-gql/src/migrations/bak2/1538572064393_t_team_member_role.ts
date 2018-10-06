import { sql } from 'sql'
import { MigrationContext } from './1538572064393_t_team_member_role.migration'
import { t_team_member_role } from './1538572064393_t_team_member_role.names'
import { TeamMemberRole } from './1538572064393_t_team_member_role.enums'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.create.table(t_team_member_role).column(t => t.c_id))
}

export const down = async ({ ddl }: MigrationContext) => {}
