import { sql } from 'sql'
import { createMigrator } from '../migrator'
import {
  t_team,
  t_team_member,
  t_team_member_role,
  t_user,
} from './1538361838269_t_team_member.names'

const { id, pid, created_at, team_id, user_id, role_id } = t_team_member

export const up = createMigrator(async ({ db }) => {
  await db.command(sql`
    create sequence "sq:${t_team_member}(${id})";
  `)

  await db.command(sql`
    create sequence "sq:${t_team_member}(${pid})"
  `)

  await db.command(sql`
    create table ${t_team_member} (
      ${id} bigint not null default nextval('sq:${t_team_member}(${id})'),
      ${pid} bigint not null default nextval('sq:${t_team_member}(${pid})'),
      ${created_at} datetime2 not null default (now() at time zone 'utc'),
      ${team_id} bigint not null,
      ${user_id} bigint not null,
      ${role_id} bigint not null
    );
  `)

  await db.command(sql`
    alter sequence "sq:${t_team_member}(${id})" owned by ${t_team_member}.${id};
  `)

  await db.command(sql`
    alter sequence "sq:${t_team_member}(${pid})" owned by ${t_team_member}.${pid};
  `)

  await db.command(sql`
    alter table ${t_team_member}
    add constraint "pk:${t_team_member}"
    primary key ( ${id} );
  `)

  await db.command(sql`
    create unique index "ix:${t_team_member}(${pid})"
    on ${t_team_member} ( ${pid} ); 
  `)

  await db.command(sql`
    create unique index "ix:${t_team_member}(${team_id}, ${role_id})"
    on ${t_team_member} ( ${team_id}, ${role_id} ); 
  `)

  await db.command(sql`
    create index "ix:${t_team_member}(${team_id})"
    on ${t_team_member} ( ${team_id} ); 
  `)

  await db.command(sql`
    create index "ix:${t_team_member}(${user_id})"
    on ${t_team_member} ( ${user_id} ); 
  `)

  await db.command(sql`
    create index "ix:${t_team_member}(${role_id})"
    on ${t_team_member} ( ${role_id} ); 
  `)

  await db.command(sql`
    alter table ${t_team_member}
    add constraint "fk:${t_team_member}(${team_id})->${t_team}(${t_team.id})"
    foreign key ( ${team_id} ) references ${t_team} ( ${t_team.id} };
  `)
})

export const down = createMigrator(async ({ db }) => {
  await db.command(sql`
    drop table ${t_team_member};
  `)
})
