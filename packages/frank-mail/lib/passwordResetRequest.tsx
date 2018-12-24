import React from 'react'
import createTemplate from './createTemplate'

export type PasswordResetRequestData = {
  user: {
    firstName: string
  }
  link: string
}

export default createTemplate<PasswordResetRequestData>(
  ({ data: { user: { firstName }, link } }) => ({
    subject: `Frank password reset`,
    body: (
      <div>
        <div>
          Hi {firstName}, somebody recently asked to reset your password.
          Click here to do it:
        </div>
        <div>
          <a href={link} target="_blank">Reset password</a>.
        </div>
        <div>
          Please ignore this email if this wasn't you.
        </div>
      </div>
    )
  })
)
