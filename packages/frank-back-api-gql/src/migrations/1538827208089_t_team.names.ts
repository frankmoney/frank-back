/* tslint:disable:variable-name */
import { SqlLiteral, literal } from 'sql'

export const account = tableEx('t_account', {
  data: 'c_data',
  name: 'c_name',
  teamId: 'c_team_id',
})

export const category = tableEx('t_category', {
  name: 'c_name',
  color: 'c_color',
  accountId: 'c_account_id',
})

export const onboarding = tableEx('t_onboarding', {
  step: 'c_step',
  institution: 'c_institution',
  credentials: 'c_credentials',
  accounts: 'c_accounts',
  account: 'c_account',
  categories: 'c_categories',
  mfa: 'c_mfa',
  team: 'c_team',
  member: 'c_member',
  userId: 'c_user_id',
})

export const payment = tableEx('t_payment', {
  data: 'c_data',
  postedOn: 'c_posted_on',
  amount: 'c_amount',
  peerName: 'c_peer_name',
  description: 'c_description',
  accountId: 'c_account_id',
  peerId: 'c_peer_id',
  categoryId: 'c_category_id',
})

export const peer = tableEx('t_peer', {
  name: 'c_name',
  accountId: 'c_account_id',
})

export const story = tableEx('t_story', {
  updatedAt: 'c_updated_at',
  accountId: 'c_account_id',
  draftId: 'c_draft_id',
  dataId: 'c_data_id',
})

export const storyData = tableEx('t_story_data', {
  updatedAt: 'c_updated_at',
  cover: 'c_cover',
  title: 'c_title',
  body: 'c_body',
})

export const team = tableEx('t_team', {
  name: 'c_name',
})

export const teamMember = tableEx('t_team_member', {
  roleId: 'c_role_id',
  teamId: 'c_team_id',
  userId: 'c_user_id',
})

export const teamMemberInvite = tableEx('t_team_member_invite', {
  email: 'c_email',
  note: 'c_note',
  roleId: 'c_role_id',
  teamId: 'c_team_id',
})

export const teamMemberRole = tableEx('t_team_member_role', {
  name: 'c_name',
})

export const user = tableEx('t_user', {
  email: 'c_email',
  lastName: 'c_last_name',
  firstName: 'c_first_name',
  avatar: 'c_avatar',
})

// helpers

function tableEx<TColumns extends { [column: string]: string }>(
  name: string,
  columns: TColumns
): TableName<
  {
    id: 'c_id'
    pid: 'c_pid'
    createdAt: 'c_created_at'
    creatorId: 'c_creator_id'
    updatedAt: 'c_updated_at'
    updaterId: 'c_updater_id'
  } & TColumns
> {
  const columnsEx = {
    id: 'c_id',
    pid: 'c_pid',
    createdAt: 'c_created_at',
    creatorId: 'c_creator_id',
    updatedAt: 'c_updated_at',
    updaterId: 'c_updater_id',
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
