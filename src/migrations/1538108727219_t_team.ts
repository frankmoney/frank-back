import { sql } from 'sql'
import { createMigrator } from '../migrator'

export const up = createMigrator(
  async ({ db }) => {
    await db.command(sql`
      create table "t_team" (
        "id" serial primary key not null,
        "pid" serial not null,
        "name" varchar(128) not null
      );
    `)
  }
)

export const down = createMigrator(
  async ({ db }) => {
    await db.command(sql`
      drop table "t_team";
    `)
  }
)
