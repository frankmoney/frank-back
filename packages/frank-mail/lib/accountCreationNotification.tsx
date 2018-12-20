import React from 'react'
import createTemplate from './createTemplate'

export type AccountCreationNotificationData = {
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

export default createTemplate<AccountCreationNotificationData>(
  ({ data: { user, creator, link } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    const creatorFullName = creator.lastName ? `${creator.firstName} ${creator.lastName}` : creator.firstName

    return {
      subject: `New account added for your team in Frank`,
      body: (
        <div>
          <div>
            Hello, ${userFullName}!
          </div>
          <div>
            ${creatorFullName} just added new bank account to your team in Frank.<br />
            You can see it
            <a href={link} target="_blank">here</a>.
          </div>
        </div>
      )
    }
  }
)
