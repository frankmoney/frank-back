import SqlBuildContext from './SqlBuildContext'
import SqlNode from './SqlNode'
import SqlQuery from './SqlQuery'

const buildSqlQuery = (node: SqlNode): SqlQuery => {
  const chunks: string[] = []
  const params: any[] = []

  const context: SqlBuildContext = {
    appendText(text: string) {
      chunks.push(text)
    },
    appendParam(value: any): number {
      const index = params.length
      params.push(value)
      this.appendText(`$${index}`)
      return index
    },
  }

  node.build(context)

  return {
    text: chunks.join(''),
    params,
  }
}

export default buildSqlQuery
