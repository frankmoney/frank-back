import { MigrationContext } from './1539771104374_t_onboarding.migration'
import {
  onboarding,
  mxUser,
  mxMember,
} from './1539771104374_t_onboarding.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.create.table(mxUser, true).column(t => t.mxGuid, 'uuid not null'),
    x =>
      x.create
        .table(mxMember, true)
        .column(t => t.mxGuid, 'uuid not null')
        .column(t => t.institutionCode, 'varchar(256) not null')
        .column(t => t.mxUserId, 'bigint not null'),
    x =>
      x.alter
        .table(mxMember)
        .addForeignKey()
        .column(t => t.mxUserId)
        .to(mxUser)
        .column(t => t.id),
    x =>
      x.create
        .table(onboarding, true)
        .column(t => t.step, 'varchar(256) not null')
        .column(t => t.institution, 'jsonb not null')
        .column(t => t.credentials, 'jsonb not null')
        .column(t => t.accounts, 'jsonb')
        .column(t => t.account, 'jsonb')
        .column(t => t.categories, 'jsonb')
        .column(t => t.mfa, 'jsonb')
        .column(t => t.team, 'jsonb')
        .column(t => t.mxMemberId, 'bigint'),
    x =>
      x.alter
        .table(onboarding)
        .addForeignKey()
        .column(t => t.mxMemberId)
        .to(mxMember)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.drop.table(onboarding),
    x => x.drop.table(mxMember),
    x => x.drop.table(mxUser)
  )
}
