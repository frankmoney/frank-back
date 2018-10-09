import { sql } from 'sql'
import { MigrationContext } from './1539024590956_default_accounts.migration'
import { account } from './1539024590956_default_accounts.names'

export const up = async ({ db }: MigrationContext) => {
  await db.command(sql`
    insert into
      ${account} ( ${account.id}, ${account.name}, ${account.teamId} )
    values
      ( 1, 'Frank Money Inc.', 1 ),
      ( 2, 'Friends of Frank', 1 ),
      ( 3, 'Ibizza trip', 1 );
  `)

  await db.command(sql`
    select setval(
      'sq:${account}(${account.id})',
      (select max(${account.id}) from ${account})
    );
  `)
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(sql`
    delete from ${account} where ${account.id} in (1, 2, 3);
  `)
}
