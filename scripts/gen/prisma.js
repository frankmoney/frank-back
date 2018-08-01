/* tslint:disable:no-console */
const { existsSync, readFileSync } = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const graphqlCliPkg = require('graphql-cli/package')
const prismaBindingPkg = require('prisma-binding/package')

const graphqlCliBin = path.join(
  path.dirname(require.resolve('graphql-cli/package.json')),
  graphqlCliPkg.bin.graphql
)

const prismaBindingBin = path.join(
  path.dirname(require.resolve('prisma-binding/package.json')),
  prismaBindingPkg.bin['prisma-binding']
)

module.exports = () => {
  const currentSchema = existsSync(
    path.join('app', 'graphql', 'generated', 'prisma.graphql')
  )
    ? readFileSync(
        path.join('app', 'graphql', 'generated', 'prisma.graphql'),
        'utf8'
      )
    : null

  console.log('- Generating schema in app/graphql/generated/prisma.graphql')

  const proc = spawn(
    'node',
    [
      graphqlCliBin,
      'get-schema',
      '--dotenv',
      'config.env',
      '--project',
      'prisma',
    ],
    { stdio: 'inherit' }
  )

  proc.on('error', err => console.warn('error:', err))

  proc.on('exit', code => {
    if (code === 0) {
      const updatedSchema = existsSync(
        path.join('app', 'graphql', 'generated', 'prisma.graphql')
      )
        ? readFileSync(
            path.join('app', 'graphql', 'generated', 'prisma.graphql'),
            'utf8'
          )
        : null

      if (
        currentSchema === updatedSchema &&
        existsSync(path.join('app', 'graphql', 'generated', 'prisma.ts'))
      ) {
        console.warn(
          '- Aborting: app/graphql/generated/prisma.graphql did not change'
        )
      } else {
        console.log(
          '- Generating types for app/graphql/generated/prisma.graphql'
        )

        spawn('node', [
          prismaBindingBin,
          '-l',
          'typescript',
          '-i',
          path.join('app', 'graphql', 'generated', 'prisma.graphql'),
          '-b',
          path.join('app', 'graphql', 'generated', 'prisma.ts'),
        ])
      }
    } else {
      console.warn(`graphql exited with code ${code}`)
    }
  })
}
