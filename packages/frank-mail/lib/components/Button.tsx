import React from 'react'
import { Box, Item, A } from 'react-html-email'
import { DEFAULT_LINK_STYLE } from '../styles'

const BUTTON_COLOR = '#484DE7'
const BUTTON_TEXT_COLOR = 'white'
const BUTTON_BORDER_RADIUS = '5px'

const linkStyle = {
  ...DEFAULT_LINK_STYLE,
  color: BUTTON_TEXT_COLOR,
  backgroundColor: BUTTON_COLOR,
  borderRadius: BUTTON_BORDER_RADIUS,
  padding: '12px 47px',
  display: 'inline-block',
}

const boxStyle = {
  marginTop: '23px',
  width: '100%',
}

export default (arg: {
  link: string,
  name: string,
  align?: 'left' | 'center'
}) => {

  const { link, name, align } = arg

  return (
    <Box style={boxStyle}>
      <Item style={{textAlign: align}}>
        <A href={link} style={linkStyle}>{name}</A>
      </Item>
    </Box>
  )
}
