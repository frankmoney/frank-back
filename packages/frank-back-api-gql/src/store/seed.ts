import { SqlLiteral, join, sql } from 'sql'
import Database from './Database'
import { team, user } from './names'

export default async function seed({ db }: { db: Database }) {
  await seedUsers()
  await seedTeams()
  await seedTeamMembers()

  async function updateIdSequence(table: string | SqlLiteral) {
    await db.command(sql.unparameterized`
      select setval('sq:${table}(c_id)', (select max(c_id) from ${table}));
    `)
  }

  async function seedUsers() {
    const users = [
      { id: 1, email: 'upsnake@gmail.com', lastName: null, firstName: 'Ilya' },
      {
        id: 2,
        email: 'ilya.k@frank.ly',
        lastName: 'Kozlov',
        firstName: 'Ilya',
      },
      { id: 3, email: 'tyoma@kzkv.ru', lastName: 'Kzkv', firstName: 'Tyoma' },
      { id: 4, email: 'rinat@frank.ly', lastName: 'm', firstName: 'Rinat' },
      { id: 5, email: 'gabriel@frank.ly', lastName: 'L', firstName: 'Gabriel' },
      {
        id: 6,
        email: 'apetrova@frank.ly',
        lastName: 'Petrova',
        firstName: 'Nastya',
      },
      {
        id: 7,
        email: 'nick@frank.ly',
        lastName: 'Delitski',
        firstName: 'Nick',
      },
    ]

    const data = users.map(
      x => sql`( ${x.id}, ${x.email}, ${x.lastName}, ${x.firstName} )`
    )

    await db.command(sql`
      insert into
        ${user} (
          ${user.id},
          ${user.email},
          ${user.lastName},
          ${user.firstName}
        )
      values
        ${join(data, ', ')}
      on conflict ( ${user.id} )
      do nothing;
    `)

    await updateIdSequence(user)
  }

  async function seedTeams() {
    const teams = [{ id: 1, name: 'Frank' }]

    const data = teams.map(x => sql`( ${x.id}, ${x.name} )`)

    await db.command(sql`
      insert into
        ${team} ( ${team.id}, ${team.name} )
      values
        ${join(data, ', ')}
      on conflict ( ${team.id} )
      do nothing;
    `)
  }

  async function seedTeamMembers() {
    const data [

    ].map(x => sql`( ${x.teamId}, ${x.} )`)
  }
}
