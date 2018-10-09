import { sql } from 'sql'
import { MigrationContext } from './1539006083938_default_team.migration'
import { team } from './1539006083938_default_team.names'

export const up = async ({ db }: MigrationContext) => {
  await db.command(sql`
    insert into
      ${team} ( ${team.id}, ${team.name} )
    values
      ( 1, 'Frank' );
  `)

  await db.command(sql`
    select setval('sq:${team}(${team.id})', (select max(${
    team.id
  }) from ${team}));
  `)
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(sql`
    delete from ${team} where ${team.id} = 1;
  `)
}
