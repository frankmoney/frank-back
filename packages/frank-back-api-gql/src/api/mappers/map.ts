/* tslint:disable:max-classes-per-file */
import Mapped from './Mapped'
import Mapper from './Mapper'

type MapToConfig<TTarget> = {
  Target?: { new (): TTarget }
}

class MapTo<TTarget> {
  public constructor(config: MapToConfig<TTarget>) {
    this.config = config
  }

  public from<TSource extends {}>() {
    return new MapToFrom<TTarget, TSource>(this.config)
  }

  private readonly config: MapToConfig<TTarget>
}

type MapToFromConfig<TTarget, TSource extends {}> = {
  Target?: { new (): TTarget }
}

class MapToFrom<TTarget, TSource extends {}> {
  public constructor(config: MapToFromConfig<TTarget, TSource>) {
    this.config = config
  }

  public for(member: keyof TTarget, use: keyof TSource) {
    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [{ targetKey: member, sourceKey: use }],
    })

    return mapper
  }

  private readonly config: MapToFromConfig<TTarget, TSource>
}

type MapToFromForConfig<TTarget, TSource> = {
  Target?: { new (): TTarget }
  members: {
    targetKey: keyof TTarget
    sourceKey: keyof TSource
  }[]
}

class MapToFromFor<TTarget, TSource> {
  public static exec<TTarget, TSource>(
    mapper: MapToFromFor<TTarget, TSource>,
    source: TSource
  ): Mapped<TSource> & TTarget {
    if (source) {
      const target = mapper.config.Target ? new mapper.config.Target() : <TTarget>{}

      for (const member of mapper.config.members) {
        target[member.targetKey] = <any>source[member.sourceKey]
      }

      return Object.assign({ $source: source }, target)
    }
    return <any>source
  }

  public constructor(config: MapToFromForConfig<TTarget, TSource>) {
    this.config = config
  }

  public for(member: keyof TTarget, use: keyof TSource) {
    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [...this.config.members, { targetKey: member, sourceKey: use }],
    })

    return mapper
  }

  public build(): Mapper<TTarget, TSource> {
    return (source: TSource) => MapToFromFor.exec<TTarget, TSource>(this, source)
  }

  private readonly config: MapToFromForConfig<TTarget, TSource>
}

const map = <TTarget>(Target?: { new (): TTarget }) => {
  return new MapTo<TTarget>({ Target })
}

export default map
