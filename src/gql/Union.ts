import UnionType from './nodes/UnionType'
import UnionTypeMemberType from './nodes/UnionTypeMemberType'

const Union = (name: string, types: UnionTypeMemberType[]) =>
  new UnionType({ name, types })

export default Union
