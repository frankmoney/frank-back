import Mapped from './Mapped'

type Mapper<TTarget, TSource> = <T extends TSource | TSource[]>(
  source: T
) => T extends TSource
  ? TTarget & Mapped<TSource>
  : (TTarget & Mapped<TSource>)[]

export default Mapper
