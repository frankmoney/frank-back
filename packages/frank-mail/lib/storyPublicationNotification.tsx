import React from 'react'
import createTemplate from './createTemplate'

export type StoryPublicationNotificationData = {
  user: {
    lastName?: null | string
    firstName: string
  }
  creator: {
    lastName?: null | string
    firstName: string
  }
  link: string
}

export default createTemplate<StoryPublicationNotificationData>(
  ({ data: { user, creator, link } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    const creatorFullName = creator.lastName ? `${creator.firstName} ${creator.lastName}` : creator.firstName

    return {
      subject: `New story published by your team in Frank`,
      body: (
        <div>
          <div>
            Hello, ${userFullName}!
          </div>
          <div>
            ${creatorFullName} just published new story in Frank.<br />
            You can see it
            <a href={link} target="_blank">here</a>.
          </div>
        </div>
      )
    }
  }
)
