import { up } from 'prisma/migrations/init-peer-categories'
;(async () => {
  try {
    await up()
    // empty
  } catch (exc) {
    console.error(exc) // tslint:disable-line:no-console
    process.exit(1)
  }
})()
