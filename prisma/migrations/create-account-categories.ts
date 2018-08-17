import debug from 'debug'
import { Prisma } from 'prisma-binding'
import { Payment, Prisma as TypedPrisma } from 'app/graphql/generated/prisma'

const log = debug('migrations:create-account-categories')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const payments = await prisma.query.payments<Payment[]>(
    {},
    `{
    id
    account {
      id
    }
    category {
      id
      name
      color
      account {
        id
      }
    }
  }`
  )

  log(
    `got ${
      payments.filter(
        x => x.category && (!x.category.account || !x.category.account.id)
      ).length
    } payments`
  )

  for (const payment of payments) {
    const paymentId = payment.id
    const accountId = payment.account.id
    if (
      payment.category &&
      (!payment.category.account || !payment.category.account.id)
    ) {
      const { id, name, color } = payment.category

      log(`searching for category "${name}" in account #${accountId}`)
      const categories = await prisma.query.categories({
        where: { account: { id: accountId }, name, color },
      })

      let categoryId = categories && categories[0] && categories[0].id

      if (!categoryId) {
        log(`creating category "${name}" in account #${accountId}`)
        const result = await prisma.mutation.createCategory(
          {
            data: {
              account: {
                connect: {
                  id: accountId,
                },
              },
              name,
              color,
            },
          },
          `{ id }`
        )

        categoryId = result.id
      }

      if (categoryId && categoryId !== id) {
        log(`disconnecting payment #${paymentId} from category #${id}`)
        await prisma.mutation.updatePayment({
          where: { id: paymentId },
          data: { category: { disconnect: true } },
        })
        log(`connecting payment #${paymentId} to category #${categoryId}`)
        await prisma.mutation.updatePayment({
          where: { id: paymentId },
          data: { category: { connect: { id: categoryId } } },
        })
      }
    }
  }

  const peers = await prisma.query.peers(
    {},
    `{ id, account { id }, categories { id, account { id }, name, color } }`
  )
  for (const peer of peers) {
    const accountId = peer.account.id
    if (peer.categories) {
      for (const category of peer.categories) {
        if (
          !category.account ||
          !category.account.id ||
          category.account.id !== accountId
        ) {
          log(`disconnecting peer #${peer.id} from category #${category.id}`)
          await prisma.mutation.updatePeer({
            where: { id: peer.id },
            data: { categories: { disconnect: { id: category.id } } },
          })

          const result = await prisma.query.categories(
            {
              where: {
                account: { id: accountId },
                name: category.name,
                color: category.color,
              },
            },
            `{ id }`
          )
          if (result && result[0]) {
            log(`connecting peer #${peer.id} to category #${result[0].id}`)
            await prisma.mutation.updatePeer({
              where: { id: peer.id },
              data: { categories: { connect: { id: result[0].id } } },
            })
          }
        }
      }
    }
  }

  const cats = await prisma.query.categories({}, `{ id, account { id } }`)
  const catIds = cats.filter(x => !x.account || !x.account.id).map(x => x.id)
  log(`removing ${catIds.length} categories w/o account`)
  await prisma.mutation.deleteManyCategories({ where: { id_in: catIds } })
}
