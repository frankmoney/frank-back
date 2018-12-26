import React from 'react'
import { Box, Item, A } from 'react-html-email'
import { DEFAULT_LINK_STYLE } from './styles'

const LINK_COLOR = '#20284A'
const DIVIDER_COLOR = 'rgba(32, 40, 74, 0.08)'

const frankLinkStyle = {
  ...DEFAULT_LINK_STYLE,
  color: LINK_COLOR,
  opacity: 0.5,
}

const mediaLinkStyle = {
  ...DEFAULT_LINK_STYLE,
  color: LINK_COLOR,
  opacity: 0.3,
  marginLeft: '15px',
}

const dividerStyle = {
  backgroundColor: DIVIDER_COLOR,
  height: '1px',
  marginBottom: '10px',
}

export default () => {

  return (
    <Box width='100%'>
      <Item>
        <div style={dividerStyle}/>
      </Item>
      <Item>
        <div style={{ float: 'right' }}>
          <A href="#" style={mediaLinkStyle}>Medium</A>
          <A href="#" style={mediaLinkStyle}>Facebook</A>
          <A href="#" style={mediaLinkStyle}>Twitter</A>
        </div>
        <A href="#" style={frankLinkStyle}>Frank Team</A>
      </Item>
    </Box>
  )
}
