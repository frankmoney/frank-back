const fs = require('fs')
const path = require('path')
const { parse, visit } = require('graphql')
const { importSchema } = require('graphql-import')
const R = require('ramda')

module.exports = () => {
  const rootDir = path.join('app', 'graphql')
  const generatedDir = path.join(rootDir, 'generated')
  const outputFile = path.join(generatedDir, 'schema.graphql')
  const exclude = [generatedDir]

  const readSchema = filename => ({
    filename,
    dir: path.dirname(filename),
    src: fs.readFileSync(filename, 'utf8'),
  })

  const parseSchema = ({ src, ...rest }) => ({
    src,
    ...rest,
    ast: parse(src, { noLocation: false }),
  })

  const extractQueriesAndMutations = ({ src, ast, ...rest }) => {
    const queries = []
    const mutations = []

    const visitType = node => {
      if (node.name && node.name.kind === 'Name') {
        let target

        switch (node.name.value) {
          case 'Query':
            target = queries
            break
          case 'Mutation':
            target = mutations
            break
          default:
            return undefined
        }

        target.push(
          ...node.fields.map(field => ({
            field,
            src: src.substring(field.loc.start, field.loc.end),
          }))
        )
        return null
      }
      return undefined
    }

    visit(ast, {
      ObjectTypeDefinition: visitType,
      ObjectTypeExtension: visitType,
    })

    return {
      src,
      ast,
      ...rest,
      queries,
      mutations,
    }
  }

  const imports = []
  const queries = []
  const mutations = []

  const buildUpSchema = schema => {
    const from = path.posix.normalize(schema.filename)

    const process = ({ field, src }) => {
      visit(field, {
        NamedType({ name: { value: name } }) {
          imports.push(`# import ${name} from '${from}'`)
        },
      })
      return `  ${src}`
    }

    queries.push(...schema.queries.map(process))
    mutations.push(...schema.mutations.map(process))
  }

  const processSchema = R.pipe(
    readSchema,
    parseSchema,
    extractQueriesAndMutations,
    buildUpSchema
  )

  const processSchemas = dir => {
    const entries = fs.readdirSync(dir)
    entries.forEach(entry => {
      const filename = path.join(dir, entry)
      if (fs.statSync(filename).isDirectory()) {
        if (exclude.indexOf(filename) < 0) {
          processSchemas(filename)
        }
      } else if (/\.graphql$/.test(entry)) {
        processSchema(filename)
      }
    })
  }

  processSchemas(rootDir)

  const queryLines =
    queries.length === 0 ? [] : ['type Query {', ...queries, '}', '']

  const mutationLines =
    mutations.length === 0 ? [] : ['type Mutation {', ...mutations, '}', '']

  const indexLines = [...imports, ...queryLines, ...mutationLines, '']

  const indexSchema = indexLines.join('\n')
  const fullSchema = importSchema(indexSchema)

  fs.writeFileSync(outputFile, fullSchema, 'utf8')
  console.log(`- Generated app schema in ${outputFile}`) // tslint:disable-line:no-console
}
