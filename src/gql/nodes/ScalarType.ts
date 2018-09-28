import { ValueNode } from 'graphql'
import Maybe from './Maybe'

export default class ScalarType<TInternal = any, TExternal = any> {
  public readonly config: {
    readonly name: string
    readonly serialize: (value: any) => Maybe<TExternal>
    readonly parseValue?: (value: any) => Maybe<TInternal>
    readonly parseLiteral?: (
      valueNode: ValueNode,
      variables?: any
    ) => Maybe<TInternal>
  }

  public constructor(config: {
    name: string
    serialize: (value: any) => Maybe<TExternal>
    parseValue?: (value: any) => Maybe<TInternal>
    parseLiteral?: (valueNode: ValueNode, variables?: any) => Maybe<TInternal>
  }) {
    this.config = config
  }
}
