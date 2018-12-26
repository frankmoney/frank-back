import React from 'react'
import { Box, Item, Span } from 'react-html-email'
import createTemplate from './createTemplate'
import Button from './Button'
import {DEFAULT_TEXT_STYLE} from './styles'

export type AccountCreationNotificationData = {
  user: {
    lastName?: null | string
    firstName: string
  }
  creator: {
    lastName?: null | string
    firstName: string
  }
  accountName: string
  link: string
}

export default createTemplate<AccountCreationNotificationData>(
  ({ data: { user, creator, link, accountName } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    const creatorFullName = creator.lastName ? `${creator.firstName} ${creator.lastName}` : creator.firstName

    return {
      subject: `New account added for your team in Frank`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your teammate <b>{creatorFullName}</b> just connect the new account, <b>{accountName}</b>. Click here to view it:
          </Item>
          <Item>
            <Button link={link} name='View account' />
          </Item>
        </Box>
      )
    }
  }
)
