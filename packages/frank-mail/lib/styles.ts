export const FONT_FAMILY = 'Arial'
export const FONT_SIZE = '18px'
export const FONT_LINE_HEIGHT = '26px'
export const TEXT_COLOR = '#20284A'

export const DEFAULT_TEXT_STYLE = {
  color: TEXT_COLOR,
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  lineHeight: FONT_LINE_HEIGHT,
  wordSpacing: '-2px',
}

export const DEFAULT_LINK_STYLE = {
  ...DEFAULT_TEXT_STYLE,
  border: 0,
  outline: 'none',
  textDecoration: 'none',
}
