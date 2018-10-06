import { SqlFragment } from '../ast'
import Query from './Query'
import buildFragment from './buildFragment'

const build = (sql: SqlFragment): Query => {
  const context = {
    text: <string[]>[],
    parameters: <any[]>[],
    // tslint:disable-next-line:no-shadowed-variable
    appendText(text: string) {
      this.text.push(text)
    },
    appendParameter(value: any) {
      let index = this.parameters.indexOf(value)
      if (index < 0) {
        index = this.parameters.length
        this.parameters.push(value)
      }
      return index + 1
    },
  }

  buildFragment(sql, context)

  const text = context.text.join('')
  const params = context.parameters

  return { text, params }
}

export default build
