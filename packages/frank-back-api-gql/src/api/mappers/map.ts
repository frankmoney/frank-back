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

  public for<TTargetKey extends keyof TTarget>(
    member: TTargetKey,
    use: keyof TSource | MapMember<TTarget, TSource, TTargetKey>
  ) {
    if (typeof use !== 'function') {
      const sourceKey = use
      use = m => m.mapFrom(sourceKey)
    }

    let sourceAccessor: (source: TSource) => TTarget[TTargetKey]

    const useBuilder: MemberMapBuilder<TTarget, TSource, TTargetKey> = {
      mapFrom<TSourceKey extends keyof TSource>(key: TSourceKey) {
        sourceAccessor = source => <any>source[key]
        return true
      },
      use(accessor: (source: TSource) => TTarget[TTargetKey]) {
        sourceAccessor = accessor
        return true
      },
    }

    use(useBuilder)

    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [
        {
          targetKey: member,
          sourceMember: sourceAccessor!,
        },
      ],
    })

    return mapper
  }

  private readonly config: MapToFromConfig<TTarget, TSource>
}

type MapToFromForConfig<TTarget, TSource> = {
  Target?: { new (): TTarget }
  members: {
    targetKey: keyof TTarget
    sourceMember: (source: TSource) => any
  }[]
}

class MapToFromFor<TTarget, TSource> {
  public static exec<TTarget, TSource>(
    mapper: MapToFromFor<TTarget, TSource>,
    source: TSource
  ): Mapped<TSource> & TTarget {
    if (source) {
      const target = mapper.config.Target
        ? new mapper.config.Target()
        : <TTarget>{}

      for (const member of mapper.config.members) {
        target[member.targetKey] = member.sourceMember(source)
      }

      return Object.assign({ $source: source }, target)
    }
    return <any>source
  }

  public constructor(config: MapToFromForConfig<TTarget, TSource>) {
    this.config = config
  }

  public for<TTargetKey extends keyof TTarget>(
    member: TTargetKey,
    use: keyof TSource | MapMember<TTarget, TSource, TTargetKey>
  ) {
    if (typeof use !== 'function') {
      const sourceKey = use
      use = m => m.mapFrom(sourceKey)
    }

    let sourceAccessor: (source: TSource) => TTarget[TTargetKey]

    const useBuilder: MemberMapBuilder<TTarget, TSource, TTargetKey> = {
      mapFrom<TSourceKey extends keyof TSource>(key: TSourceKey) {
        sourceAccessor = source => <any>source[key]
        return true
      },
      use(accessor: (source: TSource) => TTarget[TTargetKey]) {
        sourceAccessor = accessor
        return true
      },
    }

    use(useBuilder)

    const mapper = new MapToFromFor<TTarget, TSource>({
      ...this.config,
      members: [
        ...this.config.members,
        {
          targetKey: member,
          sourceMember: sourceAccessor!,
        },
      ],
    })

    return mapper
  }

  public build(): Mapper<TTarget, TSource> {
    return <T extends TSource | TSource[]>(
      source: T
    ): T extends TSource
      ? (TTarget & Mapped<TSource>)
      : (TTarget & Mapped<TSource>)[] => {
      if (Array.isArray(source)) {
        const array: TSource[] = source
        return <any>array.map(x => MapToFromFor.exec<TTarget, TSource>(this, x))
      } else {
        const single = <TSource>source
        return <any>MapToFromFor.exec<TTarget, TSource>(this, single)
      }
    }
  }

  private readonly config: MapToFromForConfig<TTarget, TSource>
}

export type MapMember<TTarget, TSource, TTargetKey extends keyof TTarget> = (
  m: MemberMapBuilder<TTarget, TSource, TTargetKey>
) => true

export type MemberMapBuilder<
  TTarget,
  TSource,
  TTargetKey extends keyof TTarget
> = {
  mapFrom: <TSourceKey extends keyof TSource>(key: TSourceKey) => true
  use: (accessor: (source: TSource) => TTarget[TTargetKey]) => true
}

const map = <TTarget>(Target?: { new (): TTarget }) => {
  return new MapTo<TTarget>({ Target })
}

export default map
