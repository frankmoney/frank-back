import { SqlLiteral, join, sql } from 'sql'
import CategoryType from 'api/types/CategoryType'
import hashPassword from 'utils/hashPassword'
import Database from './Database'
import { CurrencyCode, TeamMemberRole, UserType } from './enums'
import { account, category, peer, team, teamMember, user } from './names'
import seedPayments from './seeds/payments'

export default async function seed({ db }: { db: Database }) {
  await seedUsers()
  await seedTeams()
  // await seedTeamMembers()
  await seedAccounts()
  await seedCategories()
  await seedPeers()
  await seedPayments(db, updateIdSequence)

  async function updateIdSequence(table: string | SqlLiteral) {
    await db.command(sql.unparameterized`
      select setval('sq:${table}(c_id)', (select max(c_id) from ${table}));
    `)
  }

  async function seedUsers() {
    const users = [
      { email: 'upsnake@gmail.com', lastName: null, firstName: 'Ilya' },
      {
        email: 'ilya.k@frank.ly',
        lastName: 'Kozlov',
        firstName: 'Ilya',
      },
      { email: 'tyoma@kzkv.ru', lastName: 'Kzkv', firstName: 'Tyoma' },
      { email: 'rinat@frank.ly', lastName: 'M', firstName: 'Rinat' },
      { email: 'gabriel@frank.ly', lastName: 'L', firstName: 'Gabriel' },
      {
        email: 'apetrova@frank.ly',
        lastName: 'Petrova',
        firstName: 'Nastya',
      },
      {
        email: 'nick@frank.ly',
        lastName: 'Delitski',
        firstName: 'Nick',
      },
    ]

    const data = users.map(
      x =>
        sql`( ${x.email}, ${x.email}, ${x.lastName}, ${x.firstName}, ${
          UserType.person
        }, 1, ${hashPassword('123')} )`
    )

    await db.command(sql`
      insert into
        ${user} (
          ${user.email},
          ${user.name},
          ${user.lastName},
          ${user.firstName},
          ${user.typeId},
          ${user.color},
          ${user.passwordHash}
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

    await updateIdSequence(team)
  }

  async function seedTeamMembers() {
    const data = [
      { teamId: 1, userId: 1, roleId: TeamMemberRole.observer },
      { teamId: 1, userId: 2, roleId: TeamMemberRole.manager },
      { teamId: 1, userId: 3, roleId: TeamMemberRole.administrator },
      { teamId: 1, userId: 4, roleId: TeamMemberRole.administrator },
      { teamId: 1, userId: 5, roleId: TeamMemberRole.administrator },
      { teamId: 1, userId: 6, roleId: TeamMemberRole.administrator },
      { teamId: 1, userId: 7, roleId: TeamMemberRole.administrator },
    ].map(x => sql`( ${x.teamId}, ${x.userId}, ${x.roleId} )`)

    await db.command(sql`
      insert into
        ${teamMember} ( ${teamMember.teamId}, ${teamMember.userId}, ${
      teamMember.roleId
    } )
      values
        ${join(data, ', ')}
      on conflict ( ${teamMember.teamId}, ${teamMember.userId} )
      do nothing;
    `)
  }

  async function seedAccounts() {
    const accounts = [
      { accountId: 1, teamId: 1, name: 'Frank Money Inc.' },
      { accountId: 2, teamId: 1, name: 'Friends of Frank' },
    ]

    const data = accounts.map(
      x => sql`( ${x.accountId}, ${x.teamId}, ${x.name}, ${CurrencyCode.usd} )`
    )

    await db.command(sql`
      insert into
        ${account} ( ${account.id}, ${account.teamId}, ${account.name}, ${
      account.currencyCode
    } )
      values
        ${join(data, ', ')}
      on conflict ( ${account.id} )
      do nothing;
    `)

    await updateIdSequence(account)
  }

  async function seedCategories() {
    const categories = [
      {
        categoryId: 1,
        accountId: 1,
        name: 'Other income',
        color: '#0a70dd',
        type: CategoryType.revenue,
      },
      {
        categoryId: 2,
        accountId: 1,
        name: 'Software development',
        color: '#3cd5c1',
        type: CategoryType.spending,
      },
      {
        categoryId: 3,
        accountId: 1,
        name: 'Salary',
        color: '#00bd6a',
        type: CategoryType.spending,
      },
      {
        categoryId: 4,
        accountId: 1,
        name: 'Taxes',
        color: '#ffb54c',
        type: CategoryType.spending,
      },
      {
        categoryId: 5,
        accountId: 1,
        name: 'Product development',
        color: '#3cd5c1',
        type: CategoryType.spending,
      },
      {
        categoryId: 6,
        accountId: 1,
        name: 'Internal transfer',
        color: '#0a70dd',
        type: CategoryType.spending,
      },
      {
        categoryId: 7,
        accountId: 1,
        name: 'Government grants',
        color: '#00bd6a',
        type: CategoryType.revenue,
      },
      {
        categoryId: 8,
        accountId: 1,
        name: 'Product design',
        color: '#0aaddb',
        type: CategoryType.spending,
      },
      {
        categoryId: 9,
        accountId: 1,
        name: 'Fundraising events',
        color: '#00bd6a',
        type: CategoryType.spending,
      },
      {
        categoryId: 10,
        accountId: 1,
        name: 'Fundraising expenses',
        color: '#b259ad',
        type: CategoryType.spending,
      },
      {
        categoryId: 11,
        accountId: 1,
        name: 'Grants',
        color: '#00bd6a',
        type: CategoryType.revenue,
      },
      {
        categoryId: 12,
        accountId: 1,
        name: 'Marketing research',
        color: '#c2e691',
        type: CategoryType.spending,
      },
      {
        categoryId: 13,
        accountId: 1,
        name: 'Operating expenses',
        color: '#b259ad',
        type: CategoryType.spending,
      },
      {
        categoryId: 14,
        accountId: 2,
        name: 'Fundraising expenses',
        color: '#b259ad',
        type: CategoryType.spending,
      },
      {
        categoryId: 15,
        accountId: 2,
        name: 'Software development',
        color: '#3cd5c1',
        type: CategoryType.spending,
      },
      {
        categoryId: 16,
        accountId: 2,
        name: 'Program expenses',
        color: '#fc5d7b',
        type: CategoryType.spending,
      },
      {
        categoryId: 17,
        accountId: 2,
        name: 'Business development',
        color: '#d6c8a1',
        type: CategoryType.spending,
      },
      {
        categoryId: 18,
        accountId: 2,
        name: 'Salary',
        color: '#00bd6a',
        type: CategoryType.spending,
      },
      {
        categoryId: 19,
        accountId: 2,
        name: 'Investments',
        color: '#00bd6a',
        type: CategoryType.revenue,
      },
    ]

    const data = categories.map(
      x =>
        sql`( ${x.categoryId}, ${x.accountId}, ${x.name}, ${x.color}, ${
          x.type
        } )`
    )

    await db.command(sql`
      insert into
        ${category} ( ${category.id}, ${category.accountId}, ${
      category.name
    }, ${category.color}, ${category.type} )
      values
        ${join(data, ', ')}
      on conflict ( ${category.id} )
      do nothing;
    `)

    await updateIdSequence(category)
  }

  async function seedPeers() {
    const peers = [
      { accountId: 1, peerId: 1, name: 'Dropbox' },
      { accountId: 1, peerId: 2, name: 'Parshukov Sergey Vladimirovich I' },
      { accountId: 1, peerId: 3, name: 'Amazon' },
      { accountId: 1, peerId: 4, name: 'Ghost Inspector' },
      { accountId: 1, peerId: 5, name: 'Docker Inc.' },
      { accountId: 1, peerId: 6, name: 'Golnikov Sergey Vladimirovich' },
      { accountId: 1, peerId: 7, name: 'Murtazin Rinat Zinurovich (Ip)' },
      { accountId: 1, peerId: 8, name: 'Petrova Anastasiia Anatolevna' },
      { accountId: 1, peerId: 9, name: 'Intercom' },
      { accountId: 1, peerId: 10, name: 'Ip Kozlov Ilya Borisovich' },
      { accountId: 1, peerId: 11, name: 'Segment Integrations' },
      { accountId: 1, peerId: 12, name: 'Google' },
      { accountId: 1, peerId: 13, name: 'Yodlee' },
      { accountId: 1, peerId: 14, name: 'Slack' },
      { accountId: 1, peerId: 15, name: 'Lukianov Nikita Germanovich' },
      { accountId: 1, peerId: 16, name: 'Npm Inc.' },
      { accountId: 1, peerId: 17, name: 'Delitskiy Nikolay Yurevich' },
      { accountId: 1, peerId: 18, name: 'Tax Payment' },
      { accountId: 1, peerId: 19, name: 'Samarenkov Dmitrii Alekseevich' },
      { accountId: 2, peerId: 20, name: 'Npm Inc.' },
      { accountId: 2, peerId: 21, name: 'Murtazin Rinat Zinurovich (Ip)' },
      { accountId: 2, peerId: 22, name: 'Segment Integrations' },
      { accountId: 2, peerId: 23, name: 'Ip Kozlov Ilya Borisovich' },
      { accountId: 2, peerId: 24, name: 'Golnikov Sergey Vladimirovich' },
      { accountId: 2, peerId: 25, name: 'Tax Payment' },
      { accountId: 2, peerId: 26, name: 'Intercom' },
      { accountId: 2, peerId: 27, name: 'Lukianov Nikita Germanovich' },
      { accountId: 2, peerId: 28, name: 'Slack' },
      { accountId: 2, peerId: 29, name: 'Parshukov Sergey Vladimirovich I' },
      { accountId: 2, peerId: 30, name: 'Ghost Inspector' },
      { accountId: 2, peerId: 31, name: 'Yodlee' },
      { accountId: 2, peerId: 32, name: 'Dropbox' },
      { accountId: 2, peerId: 33, name: 'Docker Inc.' },
      { accountId: 2, peerId: 34, name: 'Petrova Anastasiia Anatolevna' },
      { accountId: 2, peerId: 35, name: 'Delitskiy Nikolay Yurevich' },
      { accountId: 2, peerId: 36, name: 'Samarenkov Dmitrii Alekseevich (Ip)' },
      { accountId: 2, peerId: 37, name: 'Google' },
      { accountId: 2, peerId: 38, name: 'Amazon' },
      { accountId: 2, peerId: 39, name: 'Anna Liberman' },
      { accountId: 2, peerId: 40, name: 'David Liberman' },
      { accountId: 2, peerId: 41, name: 'Daniil Liberman' },
      { accountId: 2, peerId: 42, name: 'Maria Liberman' },
    ]

    const data = peers.map(x => sql`( ${x.peerId}, ${x.accountId}, ${x.name} )`)

    await db.command(sql`
      insert into
        ${peer} ( ${peer.id}, ${peer.accountId}, ${peer.name} )
      values
        ${join(data, ', ')}
      on conflict ( ${peer.id} )
      do nothing;
    `)

    await updateIdSequence(peer)
  }
}
