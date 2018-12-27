import React, { ReactElement } from 'react'
import { Email, Box, Item, A } from 'react-html-email'
import Footer from './Footer'
import Logo from './Logo'
import { DEFAULT_TEXT_STYLE } from '../styles'

export const CARD_WIDTH = '460px'
export const CARD_BACKGROUND_COLOR = '#FFFFFF'
export const BODY_BACKGROUND_COLOR = '#F5F5F5'
export const CARD_MARGIN_TOP = '40px'
export const CARD_MARGIN_BOTTOM = '40px'

export const CARD_STYLE = {
  backgroundColor: CARD_BACKGROUND_COLOR,
  borderRadius: '8px',
  filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.03))',
  padding: '40px 40px 23px 40px',
}

export const CARD_BODY_CONTAINER_STYLE = {
  paddingTop: '37px',
}

export const END_NOTE_STYLE = {
  ...DEFAULT_TEXT_STYLE,
  fontSize: '16px',
  lineHeight: '24px',
  color: 'rgba(32, 40, 74, 0.3)',
  paddingTop: '21px',
}

export const UNSUBSCRIBE_LINK_STYLE = {
  color: 'rgba(32, 40, 74, 0.5)',
  textDecoration: 'none',
}


export default (args: {
  body: ReactElement<any>,
}) => {

  return (
    <Email width={CARD_WIDTH} bgcolor={BODY_BACKGROUND_COLOR} title='Frank EMail'>
      <Item>
        <Box height={CARD_MARGIN_TOP} width={CARD_WIDTH}><Item/></Box>
        <Box>
          <Item bgcolor={CARD_BACKGROUND_COLOR} style={CARD_STYLE}>
            <Box>
              <Item>
                <Logo/>
              </Item>
              <Item style={CARD_BODY_CONTAINER_STYLE}>
                {args.body}
              </Item>
              <Item>
                <Footer/>
              </Item>
            </Box>
          </Item>
          <Item style={END_NOTE_STYLE}>
            Any questions? Reply to this email or
            <A href='#' style={UNSUBSCRIBE_LINK_STYLE}> request a call back Unsubscribe </A>
            from all future emails like this
          </Item>
        </Box>
        <Box height={CARD_MARGIN_BOTTOM} width={CARD_WIDTH}><Item/></Box>
      </Item>
    </Email>
  )
}
