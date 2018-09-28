import { format } from 'date-fns'
import { Kind, ValueNode } from 'graphql'
import { isNil } from 'ramda'
import Scalar from './Scalar'

const Time = Scalar('Date', type =>
  type
    .serialize((value: string) => format(value, 'HH:mm:ss.SSS'))
    .parseValue((value: string) => format(value, 'HH:mm:ss.SSS'))
    .parseLiteral((node: ValueNode, variables: any) => {
      switch (node.kind) {
        case Kind.NULL:
          return null
        case Kind.STRING:
          return format(node.value, 'YYYY-MM-DD:mm:ss.SSS')
        case Kind.VARIABLE:
          const name = node.name.value
          const value = variables ? variables[name] : undefined
          return isNil(value) ? value : format(value, 'HH:mm:ss.SSS')
      }
    })
)

export default Time
