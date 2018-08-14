const { Prisma } = require('prisma-binding')

const prisma = new Prisma({
  typeDefs: 'app/graphql/generated/prisma.graphql',
  endpoint: 'http://prisma.frank-dev1.frank.ly',
})

prisma.query
  .payments({}, `{ id, categoryName, categoryColor }`)
  .then(async payments => {
    const categories = await prisma.query.categories()
    for (const { id, categoryName, categoryColor } of payments) {
      const category = categories.filter(
        ({ name, color }) => name === categoryName && color === categoryColor
      )[0]

      await prisma.mutation.updatePayment({
        where: { id },
        data: { category: { connect: { id: category.id } } },
      })
    }
  })
  .then(() => console.log('DONE'), err => console.error(err))
