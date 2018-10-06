import { GraphQLFieldResolver } from 'graphql'
import FieldArgument from './FieldArgument'
import ObjectTypeFieldType from './ObjectTypeFieldType'
import Resolver from './Resolver'

export default class ObjectTypeField {
  public readonly config: {
    readonly type: ObjectTypeFieldType
    readonly nullable: boolean
    readonly resolve?: Resolver
    readonly subscribe?: Resolver
    readonly args?: { [name: string]: FieldArgument }
  }

  public constructor({
    type,
    nullable,
    resolve,
    subscribe,
    args,
  }: {
    type: ObjectTypeFieldType
    nullable: boolean
    resolve?: string | GraphQLFieldResolver<any, any, any>
    subscribe?: string | GraphQLFieldResolver<any, any, any>
    args?: { [name: string]: FieldArgument }
  }) {
    this.config = {
      type,
      nullable,
      resolve,
      subscribe,
      args,
    }
  }
}
