import React from 'react'
import { Box, Item, Span } from 'react-html-email'
import createTemplate from './createTemplate'
import Button from './Button'
import {DEFAULT_TEXT_STYLE} from './styles'

export type AccountAggregationIssuesData = {
  user: {
    lastName?: null | string
    firstName: string
  }
  account: {
    name: string
  }
  link: string
}

export default createTemplate<AccountAggregationIssuesData>(
  ({ data: { user, link, account } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    return {
      subject: `${account.name} was added`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your account <b>{account.name}</b> is having aggregation issues and requires your attention
          </Item>
          <Item>
            <Button link={link} name='Reconnect' />
          </Item>
        </Box>
      )
    }
  }
)
