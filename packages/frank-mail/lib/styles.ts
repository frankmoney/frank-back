export const BODY_FONT_FAMILY = 'Arial'
export const BODY_FONT_SIZE = '18px'
export const BODY_LINE_HEIGHT = '26px'
export const BODY_BACKGROUND_COLOR = '#F5F5F5'
export const CARD_BACKGROUND_COLOR = '#FFFFFF'
export const CARD_BORDER_RADIUS = '8px'
export const CARD_WIDTH = 460
export const CARD_SHADOW = 'drop-shadow(0 0 10px rgba(0,0,0,0.03))'
export const CARD_PADDING = '40px 40px 25px 50px'
export const LOGO_URL = 'https://assets2.frank.ly/frank/email/frank_logo_91@2x.png'
export const LOGO_WIDTH = 91
export const CONTENT_MARGIN_TOP = '40px'
export const BUTTON_PADDING = '10px 30px'
export const BUTTON_COLOR = '#484DE7'
export const BUTTON_BORDER_RADIUS = '5px'
export const BUTTON_TEXT_COLOR = 'white'

export const DEFAULT_LINK_STYLE = {
  fontFamily: BODY_FONT_FAMILY,
  fontSize: BODY_FONT_SIZE,
  wordSpacing: '-2px',
  border: 0,
  outline: 'none',
  textDecoration: 'none',
}

export const DEFAULT_TEXT_STYLE = {
  fontFamily: BODY_FONT_FAMILY,
  fontSize: BODY_FONT_SIZE,
  lineHeight: BODY_LINE_HEIGHT,
  wordSpacing: '-2px',
}

export const MAIN_STYLE = `
/*////// RESET STYLES //////*/
body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
table{border-collapse:collapse;}
img, a img{border:0; outline:none; text-decoration:none;}
h1, h2, h3, h4, h5, h6{margin:0; padding:0;}
p{margin: 1em 0;}

/*////// GENERAL STYLES //////*/
body, #bodyTable{background-color:${BODY_BACKGROUND_COLOR}}
#cardCell{padding-top:40px; padding-bottom:40px;}
#cardBody{background-color:${CARD_BACKGROUND_COLOR}; border-radius:${CARD_BORDER_RADIUS}; filter: ${CARD_SHADOW};}
#cardContainer{padding: ${CARD_PADDING};}
#cardContent{margin-top:${CONTENT_MARGIN_TOP};}
`
