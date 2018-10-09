import { sql } from 'sql'
import { MigrationContext } from './1539004612494_users.migration'
import { user } from './1539004612494_users.names'

export const up = async ({ db }: MigrationContext) => {
  await db.query(sql`
    insert into
      ${user} ( ${user.id}, ${user.email}, ${user.lastName}, ${user.firstName} )
    values
      ( 1, 'upsnake@gmail.com', null, 'Ilya' ),
      ( 2, 'ilya.k@frank.ly', 'Kozlov', 'Ilya' ),
      ( 3, 'tyoma@kzkv.ru', 'Kzkv', 'Tyoma' ),
      ( 4, 'rinat@frank.ly', 'm', 'Rinat' ),
      ( 5, 'gabriel@frank.ly', 'L', 'Gabriel' ),
      ( 6, 'apetrova@frank.ly', 'Petrova', 'Nastya' );
  `)

  await db.query(sql.unparameterized`
    select setval('sq:${user}(${user.id})', (select max(${
    user.id
  }) from ${user}));
  `)
}

export const down = async ({ db }: MigrationContext) => {
  await db.query(sql`
    delete from ${user} where ${user.id} in (1, 2, 3, 4, 5, 6);
  `)
}
