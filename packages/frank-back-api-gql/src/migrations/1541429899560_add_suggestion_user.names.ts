/* tslint:disable:variable-name */
import { SqlLiteral, literal } from 'sql'

export const account = tableEx('t_account', {
  data: 'c_data',
  name: 'c_name',
  teamId: 'c_team_id',
  currencyCode: 'c_currency_code',
})

export const category = tableEx('t_category', {
  name: 'c_name',
  color: 'c_color',
  accountId: 'c_account_id',
})

export const currency = table('t_currency', {
  code: 'c_code',
})

export const mxMember = tableEx('t_mx_member', {
  mxGuid: 'c_mx_guid',
  institutionCode: 'c_institution_code',
  mxUserId: 'c_mx_user_id',
})

export const mxUser = tableEx('t_mx_user', {
  mxGuid: 'c_mx_guid',
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
  userId: 'c_user_id',
  mxMemberId: 'c_mx_member_id',
})

export const payment = tableEx('t_payment', {
  data: 'c_data',
  postedOn: 'c_posted_on',
  amount: 'c_amount',
  peerName: 'c_peer_name',
  description: 'c_description',
  published: 'c_published',
  accountId: 'c_account_id',
  peerId: 'c_peer_id',
  categoryId: 'c_category_id',
})

export const peer = tableEx('t_peer', {
  name: 'c_name',
  accountId: 'c_account_id',
})

export const story = tableEx('t_story', {
  publishedAt: 'c_published_at',
  cover: 'c_cover',
  title: 'c_title',
  body: 'c_body',
  accountId: 'c_account_id',
})

export const storyDraft = tableEx('t_story_draft', {
  publishedAt: 'c_published_at',
  cover: 'c_cover',
  title: 'c_title',
  body: 'c_body',
  published: 'c_published',
  storyId: 'c_story_id',
})

export const storyDraftPayment = tableEx('t_story_draft_payment', {
  storyDraftId: 'c_story_draft_id',
  paymentId: 'c_payment_id',
})

export const storyPayment = tableEx('t_story_payment', {
  storyId: 'c_story_id',
  paymentId: 'c_payment_id',
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

export const teamMemberRole = table('t_team_member_role', {
  id: 'c_id',
  createdAt: 'c_created_at',
  name: 'c_name',
})

export const user = tableEx('t_user', {
  typeId: 'c_type_id',
  name: 'c_name',
  email: 'c_email',
  lastName: 'c_last_name',
  firstName: 'c_first_name',
  avatar: 'c_avatar',
  color: 'c_color',
})

export const userType = table('t_user_type', {
  id: 'c_id',
  createdAt: 'c_created_at',
  name: 'c_name',
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
