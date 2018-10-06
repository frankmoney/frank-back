import Mapped from './Mapped'

type Mapper<TTarget, TSource> = (source: TSource) => TTarget & Mapped<TSource>

export default Mapper
