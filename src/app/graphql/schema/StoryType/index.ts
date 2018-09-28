import StoryType from './StoryType'

export default StoryType

const paymentScheme = `{ id, postedOn, amount, peerName, description }`
const storyDateScheme = `{ id, title, body, coverImage, updatedAt, payments ${paymentScheme} }`

export const FULL_STORY_QUERY = `{
  id
  isPublished
  updatedAt
  draftData ${storyDateScheme}
  publicData  ${storyDateScheme}
}`
