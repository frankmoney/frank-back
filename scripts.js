const { spawn } = require('child_process')
const { join } = require('path')

const scripts = {
  generatePrismaBindings(language) {
    let ext
    switch (language) {
      case 'js':
        ext = '.js'
        language = 'javascript'
        break
      case 'ts':
        ext = '.ts'
        language = 'typescript'
        break
      default:
        throw new Error('Unsupported language: ' + language)
    }

    const prismaBindingPath = require.resolve('prisma-binding')

    const args = [
      join(prismaBindingPath, 'bin.js'),
      '-l', language,
      '-i', 'app/schema.graphql',
      '-b', 'app/generated/prisma-bindings' + ext,
    ]

    spawn('node', args, { stdio: 'inherit' })
  },
}

const script = scripts[process.argv[1]]
if (script) {
  script(...process.argv.slice(2))
} else {
  throw new Error('Unknown script: ' + process.argv[1])
}
