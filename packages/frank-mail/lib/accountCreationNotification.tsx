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
  account: {
    name: string
  }
  link: string
}

export default createTemplate<AccountCreationNotificationData>(
  ({ data: { user, creator, link, account } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    const creatorFullName = creator.lastName ? `${creator.firstName} ${creator.lastName}` : creator.firstName

    return {
      subject: `${account.name} was added`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your teammate <b>{creatorFullName}</b> just connect the new account, <b>{account.name}</b>. Click here to view it:
          </Item>
          <Item>
            <Button link={link} name='View account' />
          </Item>
        </Box>
      )
    }
  }
)
