import { Enum } from 'gql'
import SourceStatus from 'api/types/SourceStatus'

const SourceStatusType = Enum('SourceStatus', type =>
  type.values([
    SourceStatus.active,
    SourceStatus.broken,
    SourceStatus.disconnected,
  ])
)

export default SourceStatusType
