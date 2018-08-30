import EnumType from '../nodes/EnumType'
import FieldArgument from '../nodes/FieldArgument'
import InputType from '../nodes/InputType'
import InputTypeField from '../nodes/InputTypeField'
import ListType from '../nodes/ListType'
import ObjectType from '../nodes/ObjectType'
import ObjectTypeField from '../nodes/ObjectTypeField'
import ScalarType from '../nodes/ScalarType'
import Schema from '../nodes/Schema'
import TypeRef from '../nodes/TypeRef'
import UnionType from '../nodes/UnionType'
import buildEnumType from './buildEnumType'
import buildInputType from './buildInputType'
import buildObjectType from './buildObjectType'
import buildScalarType from './buildScalarType'
import buildUnionType from './buildUnionType'
import IBuildContext from './IBuildContext'

const build = (
  context: IBuildContext,
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
    | UnionType
) => {
  if (context.shouldVisit(node)) {
    if (node instanceof Schema) {
      build(context, node.config.query)
      if (node.config.mutation) {
        build(context, node.config.mutation)
      }
    } else if (node instanceof TypeRef) {
      context.tryAddTypeRef(node.config.type)
    } else if (node instanceof EnumType) {
      context.tryAddType(node.config.name, node, buildEnumType)
    } else if (node instanceof ScalarType) {
      context.tryAddType(node.config.name, node, buildScalarType)
    } else if (node instanceof ObjectType) {
      context.tryAddType(node.config.name, node, buildObjectType)
      const fields = node.config.fields()
      for (const fieldName of Object.keys(fields)) {
        build(context, fields[fieldName])
      }
    } else if (node instanceof InputType) {
      context.tryAddType(node.config.name, node, buildInputType)
      const fields = node.config.fields()
      for (const fieldName of Object.keys(fields)) {
        build(context, fields[fieldName])
      }
    } else if (node instanceof ObjectTypeField) {
      build(context, node.config.type)
      if (node.config.args) {
        const args = node.config.args
        for (const argName of Object.keys(args)) {
          build(context, args[argName])
        }
      }
    } else if (node instanceof InputTypeField) {
      build(context, node.config.type)
    } else if (node instanceof FieldArgument) {
      build(context, node.config.type)
    } else if (node instanceof ListType) {
      build(context, node.config.itemType)
    } else if (node instanceof UnionType) {
      context.tryAddType(node.config.name, node, buildUnionType)
      for (const type of node.config.types) {
        build(context, type)
      }
    } else {
      throw new Error(`Unsupported node: ${node}`)
    }
  }
}

export default build
