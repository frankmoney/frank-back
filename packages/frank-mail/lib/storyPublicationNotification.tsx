import React from 'react'
import { Box, Item, Span, Image } from 'react-html-email'
import Button from './components/Button'
import createTemplate from './createTemplate'
import { formatPaymentDates, getUserFullName } from './helpers'
import { DEFAULT_TEXT_STYLE } from './styles'
import { AccountType, UserType } from './types'

export type StoryPublicationNotificationData = {
  user: UserType
  creator: UserType,
  account: AccountType
  story: {
    title: null | string,
    link: string,
    paymentCount: number,
    paymentDates: [null | string, null | string],
    imageUrl?: null | string,
    description?: null | string,
  },
}

const imageContainerStyle = {
  paddingTop: '27px',
}

const imageStyle = {
  borderRadius: '5px',
  width: '100%',
}

const titleContainerStyle = {
  ...DEFAULT_TEXT_STYLE,
  paddingTop: '14px',
  fontSize: '22px',
  lineHeight: '28px',
  color: '#252B43',
}

const paymentsContainerStyle = {
  ...DEFAULT_TEXT_STYLE,
  paddingTop: '8px',
  color: '#252B43',
}

const paymentsDatesStyle = {
  opacity: 0.3,
  marginLeft: '15px',
}

const descriptionContainerStyle = {
  ...DEFAULT_TEXT_STYLE,
  paddingTop: '11px',
  opacity: 0.5,
}

export default createTemplate<StoryPublicationNotificationData>(
  ({ data: { user, creator, account, story } }) => {
    const userFullName = getUserFullName(user)
    const creatorFullName = getUserFullName(creator)

    return {
      subject: `New story in ${account.name}: ${story.title}`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your teammate <b>{creatorFullName}</b> just published a new story in
            your <b>{account.name}</b> account for you to read:
          </Item>
          {
            story.imageUrl &&
            <Item style={imageContainerStyle}>
              <Image src={story.imageUrl} width='100%' style={imageStyle} alt='Story pic'/>
            </Item>
          }
          <Item style={titleContainerStyle}>
            <b>{story.title}</b>
          </Item>
          {
            story.paymentCount &&
            <Item style={paymentsContainerStyle}>
              <b>$&nbsp;&nbsp;&nbsp;{story.paymentCount} payment{story.paymentCount > 1 ? 's' : ''}</b><span
              style={paymentsDatesStyle}>{formatPaymentDates(story.paymentDates)}</span>
            </Item>
          }
          {
            story.description &&
            <Item style={descriptionContainerStyle}>
              {story.description}
            </Item>
          }
          <Item>
            <Button link={story.link} name='Read now'/>
          </Item>
        </Box>
      ),
    }
  },
)
