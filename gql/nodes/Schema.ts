import {
  GraphQLFieldResolver,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  isNamedType,
} from 'graphql'
import build from '../building/build'
import IBuildContext from '../building/IBuildContext'
import EnumType from './EnumType'
import FieldArgument from './FieldArgument'
import FieldArgumentType from './FieldArgumentType'
import InputType from './InputType'
import InputTypeField from './InputTypeField'
import InputTypeFieldType from './InputTypeFieldType'
import ListType from './ListType'
import ObjectType from './ObjectType'
import ObjectTypeField from './ObjectTypeField'
import ObjectTypeFieldType from './ObjectTypeFieldType'
import Resolver from './Resolver'
import ScalarType from './ScalarType'
import TypeRef from './TypeRef'

export default class Schema {
  public readonly config: {
    readonly query: ObjectType
    readonly mutation?: ObjectType
  }

  public constructor(config: { query: ObjectType; mutation?: ObjectType }) {
    this.config = config
  }

  public build(): GraphQLSchema {
    type Context = IBuildContext & {
      visitedNodes: Set<
        | Schema
        | TypeRef
        | EnumType
        | ScalarType
        | ObjectType
        | ObjectTypeField
        | InputType
        | InputTypeField
        | FieldArgument
        | ListType
      >
      typeRefs: { [name: string]: GraphQLNamedType }
      types: {
        [name: string]: {
          node: any
          getter: (context: IBuildContext, node: any) => GraphQLType
          type?: GraphQLType
        }
      }
      _getType(name: string): GraphQLType
    }

    const context: Context = {
      visitedNodes: new Set(),
      typeRefs: {},
      types: {},

      shouldVisit(
        node:
          | Schema
          | TypeRef
          | EnumType
          | ScalarType
          | ObjectType
          | ObjectTypeField
          | InputType
          | InputTypeField
          | FieldArgument
          | ListType
      ): boolean {
        if (this.visitedNodes.has(node)) {
          return false
        }
        this.visitedNodes.add(node)
        return true
      },

      tryAddTypeRef(type: GraphQLNamedType) {
        const existing = this.typeRefs[type.name]
        if (existing) {
          if (existing !== type) {
            throw new Error(
              `Type name "${
                type.name
              }" refers to different types (${existing} !== ${type})`
            )
          }
        } else {
          this.typeRefs[type.name] = type
        }
      },

      tryAddType<TNode>(
        name: string,
        node: TNode,
        getter: (context: IBuildContext, node: TNode) => GraphQLType
      ) {
        if (this.types[name]) {
          if (this.types[name].getter !== getter) {
            throw new Error(
              `Type "${name}" was registered twice\r\n${
                this.types[name].getter
              }\r\n${getter}`
            )
          }
        } else {
          this.types[name] = { node, getter }
        }
      },

      getType<T extends GraphQLType>(
        node:
          | TypeRef
          | EnumType
          | ScalarType
          | ObjectType
          | InputType
          | ObjectTypeField
          | InputTypeField
          | ObjectTypeFieldType
          | InputTypeFieldType
          | FieldArgument
          | FieldArgumentType
          | ListType
      ): T {
        if (node instanceof TypeRef) {
          return <T>node.config.type
        }

        if (
          node instanceof EnumType ||
          node instanceof ScalarType ||
          node instanceof ObjectType ||
          node instanceof InputType
        ) {
          return <T>this._getType(node.config.name)
        }

        if (
          node instanceof ObjectTypeField ||
          node instanceof InputTypeField ||
          node instanceof FieldArgument
        ) {
          const type = this.getType(node.config.type)
          return node.config.nullable ? <T>type : <T>new GraphQLNonNull(type)
        }

        if (node instanceof ListType) {
          const rawItemType = this.getType(node.config.itemType)
          const itemType = node.config.itemsNullable
            ? rawItemType
            : new GraphQLNonNull(rawItemType)
          return <T>new GraphQLList(itemType)
        }

        throw new Error(`Unsupported node: ${node}`)
      },

      getResolver(
        resolver?: Resolver
      ): GraphQLFieldResolver<any, any> | undefined {
        if (resolver) {
          if (typeof resolver === 'string') {
            throw new Error(`Missing resolver: ${resolver}`)
          }
          return resolver
        }
        return undefined
      },

      _getType(name: string): GraphQLType {
        const record = this.types[name]
        if (!record.type) {
          record.type = record.getter(this, record.node)
        }
        return record.type
      },
    }

    build(context, this)

    const types = Object.keys(context.types)
      .map(x => context._getType(x))
      .concat(Object.keys(context.typeRefs).map(x => context.typeRefs[x]))
      .filter(isNamedType)

    const query = <GraphQLObjectType>context.getType(this.config.query)

    const mutation = this.config.mutation
      ? <GraphQLObjectType>context.getType(this.config.mutation)
      : undefined

    return new GraphQLSchema({ query, mutation, types })
  }
}
