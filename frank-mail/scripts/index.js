// eslint-disable-next-line import/no-dynamic-require
;(async () => {
  try {
    const scriptName = process.argv[2]
    await Promise.resolve(require(`./${scriptName}`)(...process.argv.slice(3)))
  } catch (exc) {
    // tslint:disable:no-console
    console.error('FATAL')
    console.error(exc)
    // tslint:enable:no-console
    process.exit(1)
  }
})()
