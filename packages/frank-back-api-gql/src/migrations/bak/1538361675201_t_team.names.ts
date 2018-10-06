/* tslint:disable:variable-name */
import { mapObjIndexed } from 'ramda'
import { WithToSqlNode, raw, toSqlNodeSymbol } from 'sql'

export const t_account = table('t_account', {
  data: 'data',
  name: 'name',
})

export const t_category = table('t_category', {
  name: 'name',
  color: 'color',
  account_id: 'account_id',
})

export const t_onboarding = table('t_onboarding', {
  step: 'step',
  institution: 'institution',
  credentials: 'credentials',
  accounts: 'accounts',
  account: 'account',
  categories: 'categories',
  mfa: 'mfa',
  team: 'team',
  member: 'member',
  user_id: 'user_id',
})

export const t_payment = table('t_payment', {
  data: 'data',
  posted_on: 'posted_on',
  amount: 'amount',
  peer_name: 'peer_name',
  description: 'description',
  account_id: 'account_id',
  peer_id: 'peer_id',
  category_id: 'category_id',
})

export const t_peer = table('t_peer', {
  name: 'name',
  account_id: 'account_id',
})

export const t_story = table('t_story', {
  updated_at: 'updated_at',
  account_id: 'account_id',
  draft_id: 'draft_id',
  data_id: 'data_id',
})

export const t_story_data = table('t_story_data', {
  updated_at: 'updated_at',
  cover: 'cover',
  title: 'title',
  body: 'body',
})

export const t_team = table('t_team', {
  name: 'name',
})

export const t_team_member = table('t_team_member', {
  role_id: 'role_id',
  team_id: 'team_id',
  user_id: 'user_id',
})

export const t_team_member_invite = table('t_team_member_invite', {
  email: 'email',
  note: 'note',
  role_id: 'role_id',
  team_id: 'team_id',
})

export const t_team_member_role = table('t_team_member_role', {
  name: 'name',
})

export const t_user = table('t_user', {
  email: 'email',
  last_name: 'last_name',
  first_name: 'first_name',
  avatar: 'avatar',
})

// tslint:disable-next-line:ban-types
type TableName<T extends { [name: string]: ColumnName }> = String &
  WithToSqlNode &
  T

// tslint:disable-next-line:ban-types
type ColumnName = String & WithToSqlNode

// tslint:disable-next-line:ban-types
function table<T extends { [name: string]: string }>(
  name: string,
  columns: T
): TableName<
  { [K in keyof T]: ColumnName } & {
    id: ColumnName
    pid: ColumnName
    created_at: ColumnName
  }
> {
  const columnNames = <{ [K in keyof T]: ColumnName }>(
    mapObjIndexed(column, columns)
  )

  const extra = {
    id: column('id'),
    pid: column('pid'),
    created_at: column('created_at'),
    [toSqlNodeSymbol]: () => raw(name)!,
  }

  // tslint:disable-next-line:no-construct
  return Object.assign(new String(name), columnNames, extra)
}

function column(name: string): ColumnName {
  // tslint:disable-next-line:no-construct
  return Object.assign(new String(name), {
    [toSqlNodeSymbol]: () => raw(name)!,
  })
}
