import React from 'react'
import { Box, Item, Span, Image } from 'react-html-email'
import Button from './Button'
import createTemplate from './createTemplate'
import { DEFAULT_TEXT_STYLE } from './styles'

export type StoryPublicationNotificationData = {
  user: {
    lastName?: null | string
    firstName: string
  }
  creator: {
    lastName?: null | string
    firstName: string
  },
  accountName: string,
  story: {
    imageUrl: string,
    title: string,
    description: string,
    link: string,
  },
}

const imageContainerStyle = {
  paddingTop: '15px',
}

const imageStyle = {
  borderRadius: '5px',
  width: '100%',
}

const titleContainerStyle = {
  ...DEFAULT_TEXT_STYLE,
  paddingTop: '15px',
  lineHeight: '28px',
  fontSize: '22px',
  color: '#252B43',
}

const descriptionContainerStyle = {
  ...DEFAULT_TEXT_STYLE,
  paddingTop: '15px',
  opacity: 0.5,
}

export default createTemplate<StoryPublicationNotificationData>(
  ({ data: { user, creator, accountName, story } }) => {
    const userFullName = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName
    const creatorFullName = creator.lastName ? `${creator.firstName} ${creator.lastName}` : creator.firstName

    return {
      subject: `New story in ${accountName}: ${story.title}`,
      body: (
        <Box>
          <Item style={DEFAULT_TEXT_STYLE}>
            Hi {userFullName}, your teammate <b>{creatorFullName}</b> just published a new story in
            your <b>{accountName}</b> account for you to read:
          </Item>
          <Item style={imageContainerStyle}>
            <Image src={story.imageUrl} width='100%' style={imageStyle} alt='Story pic'/>
          </Item>
          <Item style={titleContainerStyle}>
            <b>{story.title}</b>
          </Item>
          <Item style={descriptionContainerStyle}>
            {story.description}
          </Item>
          <Item>
            <Button link={story.link} name='Read now'/>
          </Item>
        </Box>
      ),
    }
  },
)
