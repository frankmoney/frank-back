import React from 'react'
import { Box, Item } from 'react-html-email'
import createTemplate from './createTemplate'
import Button from './components/Button'
import { getUserFullName } from './helpers'
import { DEFAULT_TEXT_STYLE } from './styles'
import { AccountType, UserType } from './types'

export type AccountCreationNotificationData = {
  user: UserType
  creator: UserType
  account: AccountType
  link: string
}

export default createTemplate<AccountCreationNotificationData>(
  ({ data: { user, creator, link, account } }) => {
    const userFullName = getUserFullName(user)
    const creatorFullName = getUserFullName(creator)

    return {
      subject: `${account.name} was added`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your teammate <b>{creatorFullName}</b> just connect the new
            account, <b>{account.name}</b>. Click here to view it:
          </Item>
          <Item>
            <Button link={link} name='View account'/>
          </Item>
        </Box>
      ),
    }
  },
)
