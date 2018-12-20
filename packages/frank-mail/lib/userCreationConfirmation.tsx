import React from 'react'
import createTemplate from './createTemplate'

export type UserCreationConfirmationData = {
  user: {
    lastName?: null | string
    firstName: string
  }
  link: string
}

export default createTemplate<UserCreationConfirmationData>(
  ({ data: { user: { lastName, firstName }, link } }) => {
    const fullName = lastName ? `${firstName} ${lastName}` : firstName

    return {
      subject: `Frank account created for ${fullName}`,
      body: (
        <div>
          <div>
            Hello, ${fullName}!
          </div>
          <div>
            Thank you for joining Frank.<br />
            Please, confirm your email using this
            <a href={link} target="_blank">link</a>.
          </div>
        </div>
      )
    }
  }
)
