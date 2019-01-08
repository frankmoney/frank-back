import React from 'react'
import { Box, Item, A } from 'react-html-email'
import { getUserFullName } from './helpers'
import Button from './components/Button'
import createTemplate from './createTemplate'
import { DEFAULT_TEXT_STYLE } from './styles'
import { UserType, TeamType } from './types'
import { Image } from 'react-html-email'

export type TeamMemberInviteData = {
  admin: UserType
  team: TeamType
  note?: string
  link: string
}

export const IMAGE1_URL = 'https://assets2.frank.ly/frank/email/invite_pic1_294@2x.png'
export const IMAGE1_WIDTH = 294
export const IMAGE1_HEIGHT = 209

export const IMAGE2_URL = 'https://assets2.frank.ly/frank/email/invite_pic2_190@2x.png'
export const IMAGE2_WIDTH = 190
export const IMAGE2_HEIGHT = 193

const headerStyle = {
  ...DEFAULT_TEXT_STYLE,
  textAlign: 'center',
  fontSize: '36px',
  lineHeight: '40px',
  paddingTop: '32px',
}

const mainTextStyle = {
  ...DEFAULT_TEXT_STYLE,
  textAlign: 'center',
  fontSize: '22px',
  lineHeight: '30px',
  paddingTop: '23px',
}

const noteTextStyle = {
  color: 'rgba(32, 40, 74, 0.5)',
}

const secondPicContainerStyle = {
  paddingTop: '70px',
}

export default createTemplate<TeamMemberInviteData>(
  ({ data: { link, admin, team, note } }) => {

    const adminFullName = getUserFullName(admin)

    return {
      subject: `${adminFullName} invited you to join ${team.name}`,
      logoAlign: 'center',
      body: (
        <Box>
          <Item align='center'>
            <Image src={IMAGE1_URL} width={IMAGE1_WIDTH} height={IMAGE1_HEIGHT} alt='Invite pic'/>
          </Item>
          <Item style={headerStyle}>
            <b>Alex has invited you to join team at Frank</b>
          </Item>
          {
            note &&
            <Item style={mainTextStyle}>
              A note for you: <span style={noteTextStyle}>Please help me out with connecting our bank account to Frank</span>
            </Item>
          }
          <Item>
            <Button link={link} name='Join now' align='center'/>
          </Item>
          <Item align='center' style={secondPicContainerStyle}>
            <Image src={IMAGE2_URL} width={IMAGE2_WIDTH} height={IMAGE2_HEIGHT} alt='Invite pic'/>
          </Item>
          <Item style={headerStyle}>
            <b>Essential tools for modern charity</b>
          </Item>
          <Item style={mainTextStyle}>
            Frank radically simplifies fundraising and creates new view of financial transparency
          </Item>
        </Box>
      ),
    }
  },
)
