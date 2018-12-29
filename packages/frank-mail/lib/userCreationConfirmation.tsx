import React from 'react'
import { Box, Item, A } from 'react-html-email'
import Button from './components/Button'
import createTemplate from './createTemplate'
import { DEFAULT_TEXT_STYLE } from './styles'
import { UserType } from './types'
import { Image } from 'react-html-email'

export type UserCreationConfirmationData = {
  user: UserType
  link: string
}

export const IMAGE_URL = 'https://assets2.frank.ly/frank/email/welcom_386@2x.png'
export const LOGO_WIDTH = 386
export const LOGO_HEIGHT = 280

const headerStyle = {
  ...DEFAULT_TEXT_STYLE,
  textAlign: 'center',
  fontSize: '36px',
  lineHeight: '26px',
  paddingTop: '32px',
}

const mainTextStyle = {
  ...DEFAULT_TEXT_STYLE,
  textAlign: 'center',
  fontSize: '22px',
  lineHeight: '30px',
  paddingTop: '23px',
}

const footerTextStyle = {
  ...DEFAULT_TEXT_STYLE,
  textAlign: 'center',
  fontSize: '18px',
  lineHeight: '26px',
  color: 'rgba(32, 40, 74, 0.5)',
  paddingTop: '95px',
}

const linkStyle = {
  color: '#484DE7',
  textDecoration: 'none',
}


export default createTemplate<UserCreationConfirmationData>(
  ({ data: { link } }) => {

    return {
      subject: `Welcome to Frank! Please confirm your email`,
      logoAlign: 'center',
      body: (
        <Box>
          <Item align='center'>
            <Image src={IMAGE_URL} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt='Welcome pic'/>
          </Item>
          <Item style={headerStyle}>
            <b>Welcome to Frank!</b>
          </Item>
          <Item style={mainTextStyle}>
            Before you and your team start using the Frank Nonprofit Toolkit, please confirm your email address:
          </Item>
          <Item>
            <Button link={link} name='Confirm email' align='center'/>
          </Item>
          <Item style={footerTextStyle}>
            Questions? We’re available 24/7.<br/>
            Reply to this email or <A href='#' style={linkStyle}>request a call back</A>.
          </Item>
        </Box>
      ),
    }
  },
)
