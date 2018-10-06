import createSqlNode from './createSqlNode'

const createSqlLiteral = (text: string) =>
  createSqlNode({
    type: 'literal',
    empty: () => !!text,
    build: context => {
      if (text) {
        context.appendText(text)
      }
    },
  })

export default createSqlLiteral
