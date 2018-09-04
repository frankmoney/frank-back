import { ValueNode } from 'graphql'
import Maybe from './Maybe'
import ScalarType from './ScalarType'

export default class ScalarTypeBuilderSerialize<
  TInternal,
  TExternal
> extends ScalarType<TInternal, TExternal> {
  public parseValue(
    parseValue: Maybe<(value: any) => TInternal>
  ): ScalarTypeBuilderSerialize<TInternal, TExternal> {
    return new ScalarTypeBuilderSerialize<TInternal, TExternal>({
      ...this.config,
      parseValue: parseValue || undefined,
    })
  }

  public parseLiteral(
    parseLiteral: Maybe<(valueNode: ValueNode, variables?: any) => TInternal>
  ): ScalarTypeBuilderSerialize<TInternal, TExternal> {
    return new ScalarTypeBuilderSerialize<TInternal, TExternal>({
      ...this.config,
      parseLiteral: parseLiteral || undefined,
    })
  }
}
