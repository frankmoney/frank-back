import ScalarType from './nodes/ScalarType'
import ScalarTypeBuilder from './nodes/ScalarTypeBuilder'

const Scalar = <TInternal = any, TExternal = any>(
  name: string,
  build: (
    type: ScalarTypeBuilder<TInternal, TExternal>
  ) => ScalarType<TInternal, TExternal>
) => build(new ScalarTypeBuilder<TInternal, TExternal>(name))

export default Scalar
