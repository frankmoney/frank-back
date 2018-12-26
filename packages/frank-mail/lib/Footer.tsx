import React from 'react'
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
    <div id='footerContainer'>
      <div style={dividerStyle}> </div>
      <div style={{ float: 'right' }}>
        <a href="#" target="_blank" style={mediaLinkStyle}>Medium</a>
        <a href="#" target="_blank" style={mediaLinkStyle}>Facebook</a>
        <a href="#" target="_blank" style={mediaLinkStyle}>Twitter</a>
      </div>
      <a href="#" target="_blank" style={frankLinkStyle}>Frank Team</a>
    </div>
  )
}
