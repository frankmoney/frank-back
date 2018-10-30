import { Enum } from 'gql'

const StoriesOrderType = Enum('StoriesOrder', type =>
  type.values(['createdAt_DESC', 'publishedAt_DESC'])
)

export default StoriesOrderType
