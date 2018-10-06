import { GraphQLType } from 'graphql'

export default class TypeRef<T extends GraphQLType = GraphQLType> {
  public readonly config: {
    readonly type: T
  }

  public constructor(type: T) {
    this.config = { type }
  }
}
