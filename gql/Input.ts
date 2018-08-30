import InputType from './nodes/InputType'
import InputTypeBuilder from './nodes/InputTypeBuilder'

const Input = <T extends InputType>(
  name: string,
  build: (type: InputTypeBuilder) => T
): T => build(new InputTypeBuilder(name))

export default Input
