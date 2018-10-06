/* tslint:disable:max-classes-per-file */
import { SqlLiteral } from 'sql'
import Mapper from './Mapper'

type MapToConfig<TTarget> = {
  Target?: { new (): TTarget }
}

class MapTo<TTarget> {
  public constructor(config: MapToConfig<TTarget>) {
    this.config = config
  }

  public from<TSource extends string | SqlLiteral>(source: TSource) {
    return new MapToFrom<TTarget, TSource>({
      ...this.config,
      source,
    })
  }

  private readonly config: MapToConfig<TTarget>
}

type MapToFromConfig<TTarget, TSource extends string | SqlLiteral> = {
  Target?: { new (): TTarget }
  source: TSource
}

class MapToFrom<TTarget, TSource extends string | SqlLiteral> {
  public constructor(config: MapToFromConfig<TTarget, TSource>) {
    this.config = config
  }

  public for(
    member: keyof TTarget,
    use: string | SqlLiteral | ((source: TSource) => string | SqlLiteral)
  ) {
    if (typeof use === 'function') {
      use = use(this.config.source)
    }

    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [{ targetKey: member, sourceKey: use }],
    })

    return mapper
  }

  private readonly config: MapToFromConfig<TTarget, TSource>
}

type MapToFromForConfig<TTarget, TSource extends string | SqlLiteral> = {
  Target?: { new (): TTarget }
  source: TSource
  members: {
    targetKey: keyof TTarget
    sourceKey: string | SqlLiteral
  }[]
}

class MapToFromFor<TTarget, TSource extends string | SqlLiteral> {
  public static exec<TTarget, TSource extends string | SqlLiteral>(
    mapper: MapToFromFor<TTarget, TSource>,
    source: any
  ): TTarget {
    if (source) {
      const target = mapper.config.Target ? new mapper.config.Target() : <TTarget>{}

      for (const member of mapper.config.members) {
        target[member.targetKey] = source[member.sourceKey.toString()]
      }

      return target
    }
    return source
  }

  public constructor(config: MapToFromForConfig<TTarget, TSource>) {
    this.config = config
  }

  public for(
    member: keyof TTarget,
    use: string | SqlLiteral | ((source: TSource) => string | SqlLiteral)
  ) {
    if (typeof use === 'function') {
      use = use(this.config.source)
    }

    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [...this.config.members, { targetKey: member, sourceKey: use }],
    })

    return mapper
  }

  public build(): Mapper<TTarget> {
    return (source: any) => MapToFromFor.exec<TTarget, TSource>(this, source)
  }

  private readonly config: MapToFromForConfig<TTarget, TSource>
}

const map = <TTarget>(Target?: { new (): TTarget }) => {
  return new MapTo<TTarget>({ Target })
}

export default map
