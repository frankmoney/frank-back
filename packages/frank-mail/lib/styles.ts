export const FONT_FAMILY = 'Arial'
export const FONT_SIZE = '18px'
export const FONT_LINE_HEIGHT = '26px'
export const TEXT_COLOR = '#20284A'
export const BODY_BACKGROUND_COLOR = '#F5F5F5'
export const CARD_BACKGROUND_COLOR = '#FFFFFF'
export const CARD_WIDTH = '460px'
export const CARD_MARGIN_TOP = '40px'
export const CARD_MARGIN_BOTTOM = '40px'

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

export const CARD_STYLE = {
  backgroundColor: CARD_BACKGROUND_COLOR,
  borderRadius: '8px',
  filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.03))',
  padding: '40px 40px 25px 40px'
}

export const CARD_BODY_CONTAINER_STYLE = {
  paddingTop: '40px'
}

export const END_NOTE_STYLE = {
  ...DEFAULT_TEXT_STYLE,
  fontSize: '16px',
  lineHeight: '24px',
  color: 'rgba(32, 40, 74, 0.3)',
  paddingTop: '25px',
}

export const UNSUBSCRIBE_LINK_STYLE = {
  color: 'rgba(32, 40, 74, 0.5)',
  textDecoration: 'none',
}
