import React from 'react'
import { Box, Item } from 'react-html-email'
import Button from './components/Button'
import createTemplate from './createTemplate'
import { getUserFullName } from './helpers'
import { DEFAULT_TEXT_STYLE } from './styles'
import { UserType } from './types'

export type PasswordResetRequestData = {
  user: UserType
  link: string
}

const ignoreBoxStyle = {
  ...DEFAULT_TEXT_STYLE,
  lineHeight: '29px',
  paddingTop: '22px',
}

export default createTemplate<PasswordResetRequestData>(
  ({ data: { user, link } }) => {

    const userFullName = getUserFullName(user)

    return {
      subject: `Frank password reset`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, somebody recently asked to reset your password. Click here to do it:
          </Item>
          <Item>
            <Button link={link} name='Reset password'/>
          </Item>
          <Item style={ignoreBoxStyle}>
            Please ignore this email if this wasn’t you.
          </Item>
        </Box>
      ),
    }
  },
)
