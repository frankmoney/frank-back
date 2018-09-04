import UnionTypeMemberType from './UnionTypeMemberType'

export default class UnionType {
  public readonly config: {
    readonly name: string
    readonly types: UnionTypeMemberType[]
  }

  public constructor(config: { name: string; types: UnionTypeMemberType[] }) {
    this.config = config
  }
}
