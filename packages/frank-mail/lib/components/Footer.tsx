import React from 'react'
import { Box, Item, A } from 'react-html-email'
import { DEFAULT_LINK_STYLE } from '../styles'

const LINK_COLOR = '#20284A'
const DIVIDER_COLOR = 'rgba(32, 40, 74, 0.08)'

const boxStyle = {
  marginTop: '39px',
  width: '100%',
}

const frankLinkStyle = {
  ...DEFAULT_LINK_STYLE,
  color: LINK_COLOR,
  opacity: 0.5,
}

const dividerStyle = {
  backgroundColor: DIVIDER_COLOR,
  height: '1px',
  marginBottom: '21px',
}

export default () => {

  return (
    <Box width='100%' style={boxStyle}>
      <Item>
        <div style={dividerStyle}/>
      </Item>
      <Item align='center'>
        <A href="https://frank.ly" style={frankLinkStyle}>Frank Team</A>
      </Item>
    </Box>
  )
}
