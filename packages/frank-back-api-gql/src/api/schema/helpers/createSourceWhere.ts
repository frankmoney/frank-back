import { mergeDeepRight } from 'ramda'
import SourceWhere from 'api/dal/Source/helpers/SourceWhere'

const createSourceWhere = (
  args: {},
  extensions?: Partial<SourceWhere>
): SourceWhere => {
  const where: SourceWhere = {}

  return extensions ? mergeDeepRight(where, extensions) : where
}

export default createSourceWhere
