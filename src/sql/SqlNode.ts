import SqlBuildContext from './SqlBuildContext'
import SqlNodeType from './SqlNodeType'
import sqlNodeSymbol from './sqlNodeSymbol'

// tslint:disable-next-line:interface-name
interface SqlNode {
  [sqlNodeSymbol]: SqlNodeType

  type: SqlNodeType

  empty(): boolean

  build(context: SqlBuildContext): void

  exec(next: SqlNode): null | SqlNode

  (next: SqlNode): null | SqlNode
}

export default SqlNode
