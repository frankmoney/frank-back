import EnumType from './nodes/EnumType'
import EnumTypeBuilder from './nodes/EnumTypeBuilder'

const Enum = <T extends EnumType>(
  name: string,
  build: (type: EnumTypeBuilder) => T
) => build(new EnumTypeBuilder(name))

export default Enum
