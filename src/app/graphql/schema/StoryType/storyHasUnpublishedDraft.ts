import { Story } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'storyHasUnpublishedDraft',
  ({ parent }) => {
    const story: Story = parent

    return !story.publicData
      ? true
      : story.publicData.title !== story.draftData.title ||
          JSON.stringify(story.publicData.body) !==
            JSON.stringify(story.draftData.body) ||
          JSON.stringify(story.publicData.coverImage) !==
            JSON.stringify(story.draftData.coverImage)
  }
)
