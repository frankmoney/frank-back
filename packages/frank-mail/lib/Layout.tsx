import React, { ReactElement } from 'react'
import { Email, Box, Item, A } from 'react-html-email'
import Footer from './Footer'
import Logo from './Logo'

import {
  CARD_STYLE,
  CARD_BODY_CONTAINER_STYLE,
  CARD_WIDTH,
  CARD_BACKGROUND_COLOR,
  BODY_BACKGROUND_COLOR,
  CARD_MARGIN_BOTTOM,
  CARD_MARGIN_TOP,
  END_NOTE_STYLE,
  UNSUBSCRIBE_LINK_STYLE,
} from './styles'

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
