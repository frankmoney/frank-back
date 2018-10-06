import fs from 'fs-extra'
import path from 'path'
import escapeRx from 'utils/escapeRx'

type MainTemplate = {
  name: 'main'
  args: {
    imports: string[]
  }
}

type MigrationTemplate = {
  name: 'migration'
  args: {
    id: number
    name: string
  }
}

const replace = async (filename: string, args: { [key: string]: string }) => {
  let text = await fs.readFile(filename, { encoding: 'utf-8' })

  for (const key of Object.keys(args)) {
    const value = args[key]
    text = text.replace(new RegExp(escapeRx(`%%${key}%%`), 'g'), value)
  }

  return text
}

const template = (what: MainTemplate | MigrationTemplate): Promise<string> => {
  switch (what.name) {
    case 'main':
      return replace(path.join(__dirname, 'templates', 'main.ts.template'), {
        IMPORTS: what.args.imports.join('\n'),
      })
    case 'migration':
      return replace(
        path.join(__dirname, 'templates', 'migration.ts.template'),
        { ID: `${what.args.id}`, NAME: what.args.name }
      )
  }
}

export default template
