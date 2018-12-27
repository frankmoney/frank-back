import React from 'react'
import { Box, Item } from 'react-html-email'
import createTemplate from './createTemplate'
import Button from './components/Button'
import { getUserFullName } from './helpers'
import {DEFAULT_TEXT_STYLE} from './styles'
import { AccountType, UserType } from './types'

export type AccountAggregationIssuesData = {
  user: UserType
  account: AccountType
  link: string
}

export default createTemplate<AccountAggregationIssuesData>(
  ({ data: { user, link, account } }) => {
    const userFullName = getUserFullName(user)
    return {
      subject: `${account.name} needs your attention`,
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
