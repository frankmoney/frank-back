/* tslint:disable:variable-name */
import { SqlLiteral, literal } from 'sql'

export const t_account = tableEx('t_account', {
  c_data: 'c_data',
  c_name: 'c_name',
})

export const t_category = tableEx('t_category', {
  c_name: 'c_name',
  c_color: 'c_color',
  c_account_id: 'c_account_id',
})

export const t_onboarding = tableEx('t_onboarding', {
  c_step: 'c_step',
  c_institution: 'c_institution',
  c_credentials: 'c_credentials',
  c_accounts: 'c_accounts',
  c_account: 'c_account',
  c_categories: 'c_categories',
  c_mfa: 'c_mfa',
  c_team: 'c_team',
  c_member: 'c_member',
  c_user_id: 'c_user_id',
})

export const t_payment = tableEx('t_payment', {
  c_data: 'c_data',
  c_posted_on: 'c_posted_on',
  c_amount: 'c_amount',
  c_peer_name: 'c_peer_name',
  c_description: 'c_description',
  c_account_id: 'c_account_id',
  c_peer_id: 'c_peer_id',
  c_category_id: 'c_category_id',
})

export const t_peer = tableEx('t_peer', {
  c_name: 'c_name',
  c_account_id: 'c_account_id',
})

export const t_story = tableEx('t_story', {
  c_updated_at: 'c_updated_at',
  c_account_id: 'c_account_id',
  c_draft_id: 'c_draft_id',
  c_data_id: 'c_data_id',
})

export const t_story_data = tableEx('t_story_data', {
  c_updated_at: 'c_updated_at',
  c_cover: 'c_cover',
  c_title: 'c_title',
  c_body: 'c_body',
})

export const t_team = tableEx('t_team', {
  c_name: 'c_name',
})

export const t_team_member = tableEx('t_team_member', {
  c_role_id: 'c_role_id',
  c_team_id: 'c_team_id',
  c_user_id: 'c_user_id',
})

export const t_team_member_invite = tableEx('t_team_member_invite', {
  c_email: 'c_email',
  c_note: 'c_note',
  c_role_id: 'c_role_id',
  c_team_id: 'c_team_id',
})

export const t_team_member_role = table('t_team_member_role', {
  c_id: 'c_id',

  c_name: 'c_name',
})

export const t_user = tableEx('t_user', {
  c_email: 'c_email',
  c_last_name: 'c_last_name',
  c_first_name: 'c_first_name',
  c_avatar: 'c_avatar',
})

// helpers

function tableEx<TColumns extends { [column: string]: string }>(
  name: string,
  columns: TColumns
): TableName<
  {
    c_id: 'c_id'
    c_pid: 'c_pid'
    c_created_at: 'c_created_at'
    c_creator_id: 'c_creator_id'
    c_updated_at: 'c_updater_id'
  } & TColumns
> {
  const columnsEx = {
    c_id: 'c_id',
    c_pid: 'c_pid',
    c_created_at: 'c_created_at',
    c_creator_id: 'c_creator_id',
    c_updated_at: 'c_updated_at',
    c_updater_id: 'c_updater_id',
  }

  return table(name, Object.assign(columnsEx, columns))
}

type TableName<
  TColumns extends { readonly [column: string]: string }
> = SqlLiteral & { readonly [K in keyof TColumns]: ColumnName }
type ColumnName = SqlLiteral

function table<TColumns extends { readonly [column: string]: string }>(
  name: string,
  columns: TColumns
): TableName<TColumns> {
  const tableName = literal(name)
  const columnNames = <{ [K in keyof TColumns]: ColumnName }>{}
  for (const key of Object.keys(columns)) {
    columnNames[key] = column(columns[key])
  }
  return Object.assign(tableName, columnNames)
}

function column(name: string): ColumnName {
  return literal(name)
}
