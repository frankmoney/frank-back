import { GraphQLFieldResolver } from 'graphql'
import FieldArgument from './FieldArgument'
import FieldArgumentBuilder from './FieldArgumentBuilder'
import ObjectTypeField from './ObjectTypeField'
import Resolver from './Resolver'

export default class ObjectTypeFieldBuilderType extends ObjectTypeField {
  public nullable(nullable?: boolean): ObjectTypeFieldBuilderType {
    return new ObjectTypeFieldBuilderType({
      ...this.config,
      nullable: nullable !== false,
    })
  }

  public resolve(resolve: Resolver | null): ObjectTypeFieldBuilderType {
    return new ObjectTypeFieldBuilderType({
      ...this.config,
      resolve: resolve || undefined,
    })
  }

  public subscribe(subscribe: Resolver | null): ObjectTypeFieldBuilderType {
    return new ObjectTypeFieldBuilderType({
      ...this.config,
      subscribe: subscribe || undefined,
    })
  }

  public args(
    build: (arg: FieldArgumentBuilder) => { [argName: string]: FieldArgument }
  ): ObjectTypeFieldBuilderType {
    const args = build(new FieldArgumentBuilder())
    return new ObjectTypeFieldBuilderType({
      ...this.config,
      args,
    })
  }
}
