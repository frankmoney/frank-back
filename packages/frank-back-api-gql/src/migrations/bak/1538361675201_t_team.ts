import { sql } from 'sql'
import { createMigrator } from '../migrator'
import { t_team } from './1538361675201_t_team.names'

const { id, pid, created_at, name } = t_team

export const up = createMigrator(async ({ db }) => {
  await db.command(sql`
    create sequence "sq:${t_team}(${id})";
  `)

  await db.command(sql`
    create sequence "sq:${t_team}(${pid})"
  `)

  await db.command(sql`
    create table ${t_team} (
      ${id} bigint not null default nextval('sq:${t_team}(${id})'),
      ${pid} bigint not null default nextval('sq:${t_team}(${pid})'),
      ${created_at} datetime2 not null default (now() at time zone 'utc'),
      ${name} varchar(512) not null
    );
  `)

  await db.command(sql`
    alter sequence "sq:${t_team}(${id})" owned by ${t_team}.${id};
  `)

  await db.command(sql`
    alter sequence "sq:${t_team}(${pid})" owned by ${t_team}.${pid};
  `)

  await db.command(sql`
    alter table ${t_team}
    add constraint "pk:${t_team}"
    primary key ( ${id} );
  `)

  await db.command(sql`
    create unique index "ix:${t_team}(${pid})"
    on ${t_team} ( ${pid} ); 
  `)
})

export const down = createMigrator(async ({ db }) => {
  await db.command(sql`
    drop table ${t_team};
  `)
})
